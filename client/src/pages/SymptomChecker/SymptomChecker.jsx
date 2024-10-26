import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster, toast } from "sonner";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PatientFormAgeGen from "components/SymptomChecker/SymptomCheckerParts/PatientFormAgeGen";
import PatientFormSymptoms from "components/SymptomChecker/SymptomCheckerParts/PatientFormSymptoms";
import PatientFormDes from "components/SymptomChecker/SymptomCheckerParts/PatientFormDes";
import PatientFormResult from "components/SymptomChecker/SymptomCheckerParts/PatientFormResult";
import SympCheckerModal from "components/SymptomChecker/SymptomCheckerParts/SympCheckerModal";
import Footer from "components/HomePage/Footer/Footer";
import "components/SymptomChecker/SymptomChecker.scss";

export default function SymptomChecker() {
  const [patientForm, setPatientForm] = useState({
    age: "",
    gender: "",
    chosenSymps: [],
    chosenDescs: [],
  });

  // get all symptoms from DB
  const [dbSymps, setDbSymps] = useState([]);
  // filter symptoms chosen in process from dbSymps
  const [chosenSymps, setChosenSymps] = useState([]);
  // keep patient result updated every step, contain disease objects from dbDiseases
  const [patientResult, setPatientResult] = useState([]);
  // store the patientResult data if step back to 1
  const [storePatientResult, setStorePatientResult] = useState([]);
  // set step and previous step in the process
  const [prevStep, setPrevStep] = useState(1);
  const [step, setStep] = useState(1);
  const [finalStep, setFinalStep] = useState(3);
  const [checkedItem, setCheckedItem] = useState({});

  // Initialize `checkedItem` based on `patientForm.chosenDescs`
  useEffect(() => {
    const initialCheckedItems = {};
    patientForm.chosenDescs.forEach((desc) => {
      initialCheckedItems[desc.descriptionId] = true;
    });
    setCheckedItem(initialCheckedItems);
  }, [patientForm.chosenDescs]);

  const stepNames = [
    { number: 0, name: "Info" },
    { number: 1, name: "Symptoms" },
    { number: 2, name: "Details" },
    { number: 3, name: "Treatment" },
  ];

  // Fetch diseases data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/disease`)
      .then((res) => {
        setPatientResult(res.data);
        setStorePatientResult(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Fetch symptoms data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/symptom`)
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
        return;
      });
  }, []);

  // Chosen symp
  useEffect(() => {
    setChosenSymps(
      patientForm.chosenSymps
        .map((symptomId) => dbSymps.find((symptom) => symptom.id === symptomId))
        .filter((symptom) => symptom !== undefined)
    );
  }, [dbSymps, patientForm.chosenSymps]);

  useEffect(() => {
    setFinalStep(3 + chosenSymps.length);
  }, [chosenSymps]);

  const StepDisplay = () => {
    if (step === 1) {
      return (
        <PatientFormAgeGen
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step === 2) {
      return (
        <PatientFormSymptoms
          dbSymps={dbSymps}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step > 2 && step < finalStep) {
      return (
        <PatientFormDes
          chosenSymp={chosenSymps[step - 3]}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
          checkedItem={checkedItem}
          setCheckedItem={setCheckedItem}
        />
      );
    } else {
      return <PatientFormResult patientResult={patientResult} />;
    }
  };

  const handleNext = () => {
    setPrevStep(step);
    setStep((step) => step + 1);
    let scrollPosition = 0;

    // adjust scroll position based on viewport width
    if (window.innerWidth <= 767) {
      scrollPosition = 0;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 991) {
      scrollPosition = 0;
    } else {
      scrollPosition = 220;
    }

    window.scrollTo({ top: scrollPosition, left: 0, behavior: "instant" });
  };

  const checkHandleNext = () => {
    if (step === 1) {
      if (patientForm.age === "" || patientForm.gender === "") {
        toast.error("Please enter all informations");
        return;
      }
      // filter disease with suitable age and gender
      const age =
        patientForm.age <= 1
          ? "0 - 1 years old"
          : patientForm.age <= 11
          ? "2 - 11 years old"
          : patientForm.age <= 17
          ? "12 - 17 years old"
          : patientForm.age <= 64
          ? "18 - 64 years old"
          : "Above 65 years old";
      const gender = patientForm.gender;
      const _patientResult = patientResult.filter((disease) => {
        return (
          (disease.ageRanges.includes(age) ||
            disease.ageRanges.includes("All ages")) &&
          disease.genders.includes(gender)
        );
      });
      setPatientResult(_patientResult);
    } else if (step === 2) {
      if (patientForm.chosenSymps.length === 0) {
        toast.error("Please select at least one symptoms");
        return;
      }
      const chosenSymps = patientForm.chosenSymps;
      const _patientResult = patientResult.map((disease) => ({
        ...disease,
        sympMatched:
          disease.symptomIds.filter((id) => chosenSymps.includes(id)).length *
          5,
      }));
      const sortedPatientResult = _patientResult
        .filter((disease) => disease.sympMatched > 0)
        .sort((a, b) => b.sympMatched - a.sympMatched);
      setPatientResult(sortedPatientResult);
    } else if (step > 2 && step < finalStep) {
      if (
        patientForm.chosenDescs.filter(
          (desc) => desc.symptomId === chosenSymps[step - 3].id
        ).length === 0
      ) {
        toast.error("Please select at least one description");
        return;
      }
      const chosenDescs = patientForm.chosenDescs.map(
        (chosenDesc) => chosenDesc.descriptionId
      );
      const _patientResult = patientResult.map((disease) => ({
        ...disease,
        desMatched: disease.descIds.filter((id) => chosenDescs.includes(id))
          .length,
        matchedScore:
          disease.sympMatched +
          disease.descIds.filter((desc) =>
            chosenDescs.includes(desc.descriptionId)
          ).length,
      }));
      console.log(_patientResult);
      const sortedPatientResult = _patientResult.sort(
        (a, b) => b.matchedScore - a.matchedScore
      );
      setPatientResult(sortedPatientResult);
      console.log(patientForm);
    }
    handleNext();
  };

  const setDefault = () => {
    setPatientForm({
      age: "",
      gender: "",
      chosenSymps: [],
      chosenDescs: [],
    });
    handlePrev();
  };

  const handlePrev = () => {
    setPrevStep(step);
    setStep((step) => step - 1);
    let scrollPosition = 0;

    // adjust scroll position based on viewport width
    if (window.innerWidth <= 767) {
      scrollPosition = 0;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 991) {
      scrollPosition = 0;
    } else {
      scrollPosition = 220;
    }

    window.scrollTo({ top: scrollPosition, left: 0, behavior: "instant" });
  };

  const StepName = (props) => {
    return (
      <div
        className={
          "p-2 col-3 " +
          (props.number === 0
            ? "bg-blue-1 border rounded-start border-secondary-subtle"
            : "") +
          (props.number < props.currStep
            ? "bg-blue-1 border-end border-top border-bottom border-secondary-subtle"
            : "bg-white border-end border-top border-bottom border-secondary-subtle") +
          (props.number === 3 ? " rounded-end" : "")
        }
      >
        <h5
          className={
            "fw-med text-center " +
            (props.number < props.currStep ? "text-white" : "text-black")
          }
          style={{ marginBottom: "1px" }}
        >
          {props.name}
        </h5>
      </div>
    );
  };

  const ProcessBar = () => {
    return stepNames.map((stepName) => {
      return (
        <StepName
          key={stepName.number}
          number={stepName.number}
          currStep={step > 2 && step < finalStep ? 3 : step}
          name={stepName.name}
        />
      );
    });
  };

  const location = useLocation();
  const check = location.pathname === "/symptom-checker";

  console.log("storePatientResult", storePatientResult);
  console.log("patientResult", patientResult);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Health checker</title>
        </Helmet>
      </HelmetProvider>
      <SympCheckerModal />
      <div className={`symp-checker w-100 ${check ? "bg-gray-4" : ""}`}>
        <div className="content-container">
          <h3 className="text-center">Health checker</h3>
          <div className="symp-checker-board">
            <div className="card">
              <div className="progress-bar-step border rounded">
                {ProcessBar()}
              </div>
              <form>
                <div>{StepDisplay()}</div>

                <div className="steps-button-wrapper">
                  <div className="steps-back-button">
                    <button
                      className={`${step === 1 ? "hidden" : ""}`}
                      type="button"
                      onClick={() => {
                        if (step === 2) {
                          setDefault();
                          setPatientResult(storePatientResult);
                        } else {
                          handlePrev();
                        }
                      }}
                    >
                      Back
                    </button>
                  </div>
                  <div className="steps-next-button">
                    {step === finalStep ? (
                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                      >
                        Start over
                      </button>
                    ) : (
                      <>
                        <Toaster
                          toastOptions={{
                            className: "toast-noti",
                          }}
                          position="top-center"
                          richColors
                        />
                        <button
                          type="button"
                          className="btn"
                          disabled={
                            (step === 1 &&
                              (!patientForm.age ||
                                !patientForm.gender ||
                                parseInt(patientForm.age, 10) < 1 ||
                                parseInt(patientForm.age, 10) > 125)) ||
                            (step === 2 &&
                              patientForm.chosenSymps.length === 0) ||
                            (step > 2 &&
                              step < finalStep &&
                              patientForm.chosenDescs.length === 0)
                          }
                          onClick={checkHandleNext}
                        >
                          Next
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
