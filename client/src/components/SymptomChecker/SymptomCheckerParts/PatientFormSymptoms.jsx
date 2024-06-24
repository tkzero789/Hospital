import React, { useState, useRef, useEffect } from "react";
import removeAccents from "remove-accents";
import Symptom from "components/SymptomChecker/Symptom/Symptom";
import MaleFigure from "components/HumanFigures/MaleFigure/MaleFigure";
import FemaleFigure from "components/HumanFigures/FemaleFigure/FemaleFigure";
import MobileMaleFigure from "components/HumanFigures/MaleFigure/MobileMaleFigure";
import MobileFemaleFigure from "components/HumanFigures/FemaleFigure/MobileFemaleFigure";
import SearchBarSymp from "components/SymptomChecker/SearchBarSymp/SearchBarSymp";
import MobileSearchBarSymp from "components/SymptomChecker/SearchBarSymp/MobileSearchBarSymp";
import SelectedSympBox from "components/SymptomChecker/SelectedSympBox/SelectedSympBox";
import MobileSelectedSympBox from "components/SymptomChecker/SelectedSympBox/MobileSelectedSympBox";
import WholeHeadSymp from "components/SymptomChecker/WholeHeadSymp/WholeHeadSymp";
import MobileSymptom from "components/SymptomChecker/Symptom/MobileSymptom";
import { MobileSympBtn } from "components/SymptomChecker/MobileSympBtn/MobileSympBtn";
import { ExtraMobileSympBtn } from "components/SymptomChecker/MobileSympBtn/ExtraMobileSympBtn";
import "components/SymptomChecker/SymptomChecker.css";
import CloseIcon from "components/UI/CloseIcon";
import { Alert, Snackbar } from "@mui/material";
import NoSymptom from "../Symptom/NoSymptom";

export default function PatientFormSymptoms({
  dbSymps,
  patientForm,
  setPatientForm,
}) {
  const onCheck = (symptomId) => {
    if (patientForm.chosenSymps.includes(symptomId)) {
      setPatientForm({
        ...patientForm,
        chosenSymps: patientForm.chosenSymps.filter(
          (chosenId) => chosenId !== symptomId
        ),
        chosenDescs: patientForm.chosenDescs.filter(
          (chosenDesc) => chosenDesc.symptomId !== symptomId
        ),
      });
    } else {
      setPatientForm({
        ...patientForm,
        chosenSymps: [...patientForm.chosenSymps, symptomId],
      });
    }
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filter symptoms based on search term
  const filteredSymps = dbSymps.filter((symptom) =>
    removeAccents(symptom.name)
      .toLowerCase()
      .includes(removeAccents(searchTerm).toLowerCase())
  );

  // Delele selected symptoms
  const handleDelete = (event, symptomId) => {
    event.preventDefault();
    setPatientForm({
      ...patientForm,
      chosenSymps: patientForm.chosenSymps.filter(
        (chosenId) => chosenId !== symptomId
      ),
      chosenDescs: patientForm.chosenDescs.filter(
        (chosenDesc) => chosenDesc.symptomId !== symptomId
      ),
    });
  };

  // Click outside to close search result (selected-symp-box)
  const inputRef = useRef();
  const searchSympRef = useRef();
  const [displaySearch, setDisplaySearch] = useState(false);

  const handleClickOutside = (event) => {
    if (
      searchSympRef.current &&
      !searchSympRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setDisplaySearch(false);
    }
  };

  // ********** Human figure **********
  // Ref
  const headRef = useRef(); // 1. Head
  const eyesRef = useRef(); // 2. Eyes
  const earsRef = useRef(); // 3. Ears
  const noseRef = useRef(); // 4. Nose
  const mouthRef = useRef(); // 5. Mouth
  const neckRef = useRef(); // 6. Neck
  const chestRef = useRef(); // 7. Chest
  const upperArmRef = useRef(); // 8. UpperArm
  const foreArmRef = useRef(); // 9. ForeArm
  const midAbRef = useRef(); // 10. MidAb
  const lowerAbRef = useRef(); // 11. LowerAbPrivate
  const handRef = useRef(); // 12. Hand
  const thighRef = useRef(); // 13. Thigh
  const kneeRef = useRef(); // 14. Knee
  const lowerLegRef = useRef(); // 15. LowerLeg
  const footRef = useRef(); // 16. Foot

  // For displaying symptoms box next to figure
  const [showHeadSymptoms, setShowHeadSymptoms] = useState(false); // 1. Head
  const [showEyesSymptoms, setShowEyesSymptoms] = useState(false); // 2. Eyes
  const [showEarsSymptoms, setShowEarsSymptoms] = useState(false); // 3. Ears
  const [showNoseSymptoms, setShowNoseSymptoms] = useState(false); // 4. Nose
  const [showMouthSymptoms, setShowMouthSymptoms] = useState(false); // 5. Mouth
  const [showNeckSymptoms, setShowNeckSymptoms] = useState(false); // 6. Neck
  const [showChestSymptoms, setShowChestSymptoms] = useState(false); // 7. Chest
  const [showUpperArmSymptoms, setShowUpperArmSymptoms] = useState(false); // 8. UpperArm
  const [showForeArmSymptoms, setShowForeArmSymptoms] = useState(false); // 9. Forearm
  const [showMidAbSymptoms, setShowMidAbSymptoms] = useState(false); // 10 MidAb
  const [showLowerAbSymptoms, setShowLowerAbSymptoms] = useState(false); // 11. LowerAbPrivate
  const [showHandSymptoms, setShowHandSymptoms] = useState(); // 12. Hand
  const [showThighSymptoms, setShowThighSymptoms] = useState(); // 13. Thigh
  const [showKneeSymptoms, setShowKneeSymptoms] = useState(); // 14. Knee
  const [showLowerLegSymptoms, setShowLowerLegSymptoms] = useState(); // 15. LowerLeg
  const [showFootSymptoms, setShowFootSymptoms] = useState(); // 16. Foot

  // Click outside to close symptoms box next to figure
  useEffect(() => {
    const handleClickOutside = (event) => {
      const closeSymptoms = (ref, setShowSymptoms) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSymptoms(false);
        }
      };

      closeSymptoms(headRef, setShowHeadSymptoms); // 1. Head
      closeSymptoms(eyesRef, setShowEyesSymptoms); // 2. Eyes
      closeSymptoms(earsRef, setShowEarsSymptoms); // 3. Ears
      closeSymptoms(noseRef, setShowNoseSymptoms); // 4. Nose
      closeSymptoms(mouthRef, setShowMouthSymptoms); // 5. Mouth
      closeSymptoms(neckRef, setShowNeckSymptoms); // 6. Neck
      closeSymptoms(chestRef, setShowChestSymptoms); // 7. Chest
      closeSymptoms(upperArmRef, setShowUpperArmSymptoms); // 8. UpperArm
      closeSymptoms(foreArmRef, setShowForeArmSymptoms); // 9. Forearm
      closeSymptoms(midAbRef, setShowMidAbSymptoms); // 10 MidAb
      closeSymptoms(lowerAbRef, setShowLowerAbSymptoms); // 11.LowerAbPrivate
      closeSymptoms(handRef, setShowHandSymptoms); // 12. Hand
      closeSymptoms(thighRef, setShowThighSymptoms); // 13. Thigh
      closeSymptoms(kneeRef, setShowKneeSymptoms); // 14. Knee
      closeSymptoms(lowerLegRef, setShowLowerLegSymptoms); // 15. LowerLeg
      closeSymptoms(footRef, setShowFootSymptoms); // 16. Foot
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up
    };
  }, []);

  // Toggle symptoms box next to figure ************
  const toggleHeadSymptoms = () => {
    setShowHeadSymptoms(!showHeadSymptoms); // 1. Head
  };
  const toggleEyesSymptoms = () => {
    setShowEyesSymptoms(!showEyesSymptoms); // 2. Eyes
  };
  const toggleEarsSymptoms = () => {
    setShowEarsSymptoms(!showEarsSymptoms); // 3. Ears
  };
  const toggleNoseSymptoms = () => {
    setShowNoseSymptoms(!showNoseSymptoms); // 4. Nose
  };
  const toggleMouthSymptoms = () => {
    setShowMouthSymptoms(!showMouthSymptoms); // 5. Mouth
  };
  const toggleNeckSymptoms = () => {
    setShowNeckSymptoms(!showNeckSymptoms); // 6. Neck
  };
  const toggleChestSymptoms = () => {
    setShowChestSymptoms(!showChestSymptoms); // 7. Chest
  };
  const toggleUpperArmSymptoms = () => {
    setShowUpperArmSymptoms(!showUpperArmSymptoms); // 8. UpperArm
  };
  const toggleForeArmSymptoms = () => {
    setShowForeArmSymptoms(!showForeArmSymptoms); // 9. ForeArm
  };
  const toggleMidAbSymptoms = () => {
    setShowMidAbSymptoms(!showMidAbSymptoms); // 10. MidAb
  };
  const toggleLowerAbSymptoms = () => {
    setShowLowerAbSymptoms(!showLowerAbSymptoms); // 11. LowerAbPrivate
  };
  const toggleHandSymptoms = () => {
    setShowHandSymptoms(!showHandSymptoms); // 12. Hand
  };
  const toggleThighSymptoms = () => {
    setShowThighSymptoms(!showThighSymptoms); // 13. Thigh
  };
  const toggleKneeSymptoms = () => {
    setShowKneeSymptoms(!showKneeSymptoms); // 14. Knee
  };
  const toggleLowerLegSymptoms = () => {
    setShowLowerLegSymptoms(!showLowerLegSymptoms); // 15. LowerLeg
  };
  const toggleFootSymptoms = () => {
    setShowFootSymptoms(!showFootSymptoms); // 16. Foot
  };

  // Click outside of search bar and search results box to close search results
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setDisplaySearch(true);
    } else {
      setDisplaySearch(false);
    }
  }, [searchTerm]);

  // ********** Mobile Figure **********

  // State for mobile
  const [wholeHeadM, setWholeHeadM] = useState(false);
  const [neckM, setNeckM] = useState(false);
  const [chestM, setChestM] = useState(false);
  const [upperArmM, setUpperArmM] = useState(false);
  const [foreArmM, setForeArmM] = useState(false);
  const [midAbM, setMidAbM] = useState(false);
  const [lowerAbM, setLowerAbM] = useState(false);
  const [handM, setHandM] = useState(false);
  const [thighM, setThighM] = useState(false);
  const [kneeM, setKneeM] = useState(false);
  const [lowerLegM, setLowerLegM] = useState(false);
  const [footM, setFootM] = useState(false);

  // State for render full screen search on mobile
  const [isAddClick, setIsAddClick] = useState(false);

  // States for wholeHead
  const [extraM, setExtraM] = useState(false);
  const [extraHeadM, setExtraHeadM] = useState(false);
  const [extraEyesM, setExtraEyesM] = useState(false);
  const [extraEarsM, setExtraEarsM] = useState(false);
  const [extraNoseM, setExtraNoseM] = useState(false);
  const [extraMouthM, setExtraMouthM] = useState(false);

  // Toggle for wholeHead (extraM, extraHeadM ... extraMouthM)
  const toggleExtraM = () => {
    setExtraM(!extraM);
    setExtraHeadM(false);
    setExtraEyesM(false);
    setExtraEarsM(false);
    setExtraNoseM(false);
    setExtraMouthM(false);
  };

  const toggleExtraHeadM = () => {
    setExtraHeadM(!extraHeadM);
    setExtraM(!extraM);
  };

  const toggleExtraEyesM = () => {
    setExtraEyesM(!extraEyesM);
    setExtraM(!extraM);
  };

  const toggleExtraEarsM = () => {
    setExtraEarsM(!extraEarsM);
    setExtraM(!extraM);
  };

  const toggleExtraNoseM = () => {
    setExtraNoseM(!extraNoseM);
    setExtraM(!extraM);
  };

  const toggleExtraMouthM = () => {
    setExtraMouthM(!extraMouthM);
    setExtraM(!extraM);
  };

  // Toggle for isAddClick
  const toggleIsAddClick = () => {
    setIsAddClick(!isAddClick);
  };

  // Toggle for mobile
  const toggleWholeHeadM = () => {
    setWholeHeadM(!wholeHeadM);
    setExtraM(false);
    setExtraHeadM(false);
    setExtraEyesM(false);
    setExtraEarsM(false);
    setExtraNoseM(false);
    setExtraMouthM(false);
  };

  const toggleNeckM = () => {
    setNeckM(!neckM);
    setExtraM(false);
  };

  const toggleChestM = () => {
    setChestM(!chestM);
  };

  const toggleUpperArmM = () => {
    setUpperArmM(!upperArmM);
  };

  const toggleForeArmM = () => {
    setForeArmM(!foreArmM);
  };

  const toggleMidAbM = () => {
    setMidAbM(!midAbM);
  };

  const toggleLowerAbM = () => {
    setLowerAbM(!lowerAbM);
  };

  const toggleHandM = () => {
    setHandM(!handM);
  };

  const toggleThighM = () => {
    setThighM(!thighM);
  };

  const toggleKneeM = () => {
    setKneeM(!kneeM);
  };

  const toggleLowerLegM = () => {
    setLowerLegM(!lowerLegM);
  };

  const toggleFootM = () => {
    setFootM(!footM);
  };

  const [isVisibleM, setIsVisibleM] = useState(false);
  const [isSwitch, setIsSwitch] = useState(true);
  // Toggle Search Bar button (left)
  const toggleSearchBar = (e) => {
    e.preventDefault();
    setIsVisibleM(false);
    setIsSwitch(true);
  };

  // Toggle Figure figure button (right)
  const toggleMobileFigure = (e) => {
    e.preventDefault();
    setIsVisibleM(true);
    setIsSwitch(false);
  };

  // Handle snackbar
  const [snackBar, setSnackBar] = useState({
    openSnackBar: false,
    vertical: "top",
    horizontal: "center",
  });
  const { openSnackBar, vertical, horizontal } = snackBar;

  const handleSnackBarPosition = (newSnackBar) => {
    setSnackBar({ ...newSnackBar, openSnackBar: true });
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, openSnackBar: false });
  };

  // The UI
  return (
    <div>
      <div className="text-center">
        <h4 className="text-dark-header fw-med pb-4">Select symptoms</h4>
      </div>
      <h5 className="card-title text-blue-3 fw-med d-none d-md-block">
        Search symptoms
      </h5>
      <div className="switch-button">
        <button
          onClick={toggleSearchBar}
          className={`${isSwitch ? "active-switch-button" : ""}`}
        >
          Search symptoms
        </button>
        <button
          onClick={toggleMobileFigure}
          className={`${isSwitch ? "" : "active-switch-button"}`}
        >
          Choose on figure
        </button>
      </div>
      <div className="symp-big-box">
        <div className="big-box-wrapper">
          {/* Left box */}
          <div className="symp-left-box">
            <div className="left-box-wrapper">
              {/* Search Bar */}
              <SearchBarSymp
                inputRef={inputRef}
                searchSympRef={searchSympRef}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                displaySearch={displaySearch}
                setDisplaySearch={setDisplaySearch}
                filteredSymps={filteredSymps}
                onCheck={onCheck}
                chosenSymps={patientForm.chosenSymps}
                handleSnackBarPosition={handleSnackBarPosition}
              />
              <div className="flex-grow-1"></div>
              {/* Display selected symptoms */}
              <SelectedSympBox
                patientForm={patientForm}
                dbSymps={dbSymps}
                handleDelete={handleDelete}
              />
            </div>
          </div>
          {/* Right box */}
          <div className="symp-right-box">
            <div className="right-box-wrapper">
              <div className="human-figure">
                {patientForm.gender === "Female" && (
                  <FemaleFigure
                    toggleHeadSymptoms={toggleHeadSymptoms}
                    toggleEyesSymptoms={toggleEyesSymptoms}
                    toggleEarsSymptoms={toggleEarsSymptoms}
                    toggleNoseSymptoms={toggleNoseSymptoms}
                    toggleMouthSymptoms={toggleMouthSymptoms}
                    toggleNeckSymptoms={toggleNeckSymptoms}
                    toggleChestSymptoms={toggleChestSymptoms}
                    toggleUpperArmSymptoms={toggleUpperArmSymptoms}
                    toggleForeArmSymptoms={toggleForeArmSymptoms}
                    toggleMidAbSymptoms={toggleMidAbSymptoms}
                    toggleLowerAbSymptoms={toggleLowerAbSymptoms}
                    toggleHandSymptoms={toggleHandSymptoms}
                    toggleThighSymptoms={toggleThighSymptoms}
                    toggleKneeSymptoms={toggleKneeSymptoms}
                    toggleLowerLegSymptoms={toggleLowerLegSymptoms}
                    toggleFootSymptoms={toggleFootSymptoms}
                  />
                )}
                {patientForm.gender === "Male" && (
                  <MaleFigure
                    toggleHeadSymptoms={toggleHeadSymptoms}
                    toggleEyesSymptoms={toggleEyesSymptoms}
                    toggleEarsSymptoms={toggleEarsSymptoms}
                    toggleNoseSymptoms={toggleNoseSymptoms}
                    toggleMouthSymptoms={toggleMouthSymptoms}
                    toggleNeckSymptoms={toggleNeckSymptoms}
                    toggleChestSymptoms={toggleChestSymptoms}
                    toggleUpperArmSymptoms={toggleUpperArmSymptoms}
                    toggleForeArmSymptoms={toggleForeArmSymptoms}
                    toggleMidAbSymptoms={toggleMidAbSymptoms}
                    toggleLowerAbSymptoms={toggleLowerAbSymptoms}
                    toggleHandSymptoms={toggleHandSymptoms}
                    toggleThighSymptoms={toggleThighSymptoms}
                    toggleKneeSymptoms={toggleKneeSymptoms}
                    toggleLowerLegSymptoms={toggleLowerLegSymptoms}
                    toggleFootSymptoms={toggleFootSymptoms}
                  />
                )}
                {/* 1. Head */}
                {showHeadSymptoms && (
                  <div ref={headRef} className="head-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Head</span>
                      <button onClick={toggleHeadSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="head-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Head" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 2. Eyes */}
                {showEyesSymptoms && (
                  <div ref={eyesRef} className="eyes-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Eyes</span>
                      <button onClick={toggleEyesSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="eyes-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Eyes" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 3. Ears */}
                {showEarsSymptoms && (
                  <div ref={earsRef} className="ears-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Ears</span>
                      <button onClick={toggleEarsSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="ears-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Ears" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 4. Nose */}
                {showNoseSymptoms && (
                  <div ref={noseRef} className="nose-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Nose</span>
                      <button onClick={toggleNoseSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="nose-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Nose" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 5. Mouth */}
                {showMouthSymptoms && (
                  <div ref={mouthRef} className="mouth-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Oral Cavity</span>
                      <button onClick={toggleMouthSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="mouth-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Mouth" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 6. Neck */}
                {showNeckSymptoms && (
                  <div ref={neckRef} className="neck-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Neck</span>
                      <button onClick={toggleNeckSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="neck-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Neck" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 7. Chest */}
                {showChestSymptoms && (
                  <div ref={chestRef} className="chest-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Chest & Upper abdomen</span>
                      <button onClick={toggleChestSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="chest-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Chest" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 8. UpperArm */}
                {showUpperArmSymptoms && (
                  <div ref={upperArmRef} className="upperArm-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Upper arm</span>
                      <button onClick={toggleUpperArmSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="upperArm-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Shoulder" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 9. ForeArm */}
                {showForeArmSymptoms && (
                  <div ref={foreArmRef} className="foreArm-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Forearm</span>
                      <button onClick={toggleForeArmSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="foreArm-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Forearm" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 10. MidAb */}
                {showMidAbSymptoms && (
                  <div ref={midAbRef} className="midAb-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Middle abdomen</span>
                      <button onClick={toggleMidAbSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="midAb-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Middle abdomen" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 11. LowerAbPrivate */}
                {showLowerAbSymptoms && (
                  <div
                    ref={lowerAbRef}
                    className="lowerAbPrivate-symptoms-list-box"
                  >
                    <div className="symptom-list-box-header">
                      <span>Lower abdomen & Sexual Organs</span>
                      <button onClick={toggleLowerAbSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="lowerAbPrivate-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Lower abdomen" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 12. Hand */}
                {showHandSymptoms && (
                  <div ref={handRef} className="hand-symptoms-list-box ">
                    <div className="symptom-list-box-header">
                      <span>Hand</span>
                      <button onClick={toggleHandSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="hand-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Hand" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 13. Thigh */}
                {showThighSymptoms && (
                  <div ref={thighRef} className="thigh-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Thigh</span>
                      <button onClick={toggleThighSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="thigh-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Pelvis, gluteal and thigh" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 14. Knee */}
                {showKneeSymptoms && (
                  <div ref={kneeRef} className="knee-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Knee</span>
                      <button onClick={toggleKneeSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="knee-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Knee" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 15. LowerLeg */}
                {showLowerLegSymptoms && (
                  <div ref={lowerLegRef} className="lowerLeg-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Shin</span>
                      <button onClick={toggleLowerLegSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="lowerLeg-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Shin" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
                {/* 16. Foot */}
                {showFootSymptoms && (
                  <div ref={footRef} className="foot-symptoms-list-box">
                    <div className="symptom-list-box-header">
                      <span>Foot</span>
                      <button onClick={toggleFootSymptoms}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="foot-symptoms-list scrollbar">
                      {dbSymps
                        .filter(
                          (symptom) =>
                            symptom.position === "Foot" &&
                            symptom.status === "Approved" &&
                            !patientForm.chosenSymps.includes(symptom.id)
                        )
                        .map((symptom) => (
                          <Symptom
                            symptom={symptom}
                            onCheck={onCheck}
                            key={symptom.id}
                            handleSnackBarPosition={handleSnackBarPosition}
                          />
                        ))}
                    </div>
                    <NoSymptom />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Add Symptoms Button */}
      <div
        className="mobile-add-symp-wrapper"
        style={{
          display: isVisibleM ? "none" : "",
          pointerEvents: isVisibleM ? "none" : "auto",
        }}
      >
        <div className="add-symp-btn">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleIsAddClick();
            }}
          >
            <span>Add a symptom</span>
            <i className="bi bi-plus-circle-fill"></i>
          </button>
          {isAddClick && (
            <MobileSearchBarSymp
              inputRef={inputRef}
              searchSympRef={searchSympRef}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              displaySearch={displaySearch}
              setDisplaySearch={setDisplaySearch}
              filteredSymps={filteredSymps}
              onCheck={onCheck}
              patientForm={patientForm}
              toggleFunction={toggleIsAddClick}
              dbSymps={dbSymps}
              chosenSymps={patientForm.chosenSymps}
              handleSnackBarPosition={handleSnackBarPosition}
            />
          )}
        </div>
      </div>
      {/* Mobile Human Figure */}
      <div
        className="mobile-right-box"
        style={{ display: isVisibleM ? "block" : "none" }}
      >
        <div className="right-box-wrapper">
          <div className="human-figure">
            {patientForm.gender === "Female" && (
              <MobileFemaleFigure
                toggleWholeHeadM={toggleWholeHeadM}
                toggleNeckM={toggleNeckM}
                toggleChestM={toggleChestM}
                toggleUpperArmM={toggleUpperArmM}
                toggleForeArmM={toggleForeArmM}
                toggleMidAbM={toggleMidAbM}
                toggleLowerAbM={toggleLowerAbM}
                toggleHandM={toggleHandM}
                toggleThighM={toggleThighM}
                toggleKneeM={toggleKneeM}
                toggleLowerLegM={toggleLowerLegM}
                toggleFootM={toggleFootM}
              />
            )}
            {patientForm.gender === "Male" && (
              <MobileMaleFigure
                toggleWholeHeadM={toggleWholeHeadM}
                toggleNeckM={toggleNeckM}
                toggleChestM={toggleChestM}
                toggleUpperArmM={toggleUpperArmM}
                toggleForeArmM={toggleForeArmM}
                toggleMidAbM={toggleMidAbM}
                toggleLowerAbM={toggleLowerAbM}
                toggleHandM={toggleHandM}
                toggleThighM={toggleThighM}
                toggleKneeM={toggleKneeM}
                toggleLowerLegM={toggleLowerLegM}
                toggleFootM={toggleFootM}
              />
            )}
            {/* 1-5. WholeHead */}
            {wholeHeadM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Positions</span>
                </div>
                <div className="mobile-symptoms-list">
                  {/* Head */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraHeadM();
                    }}
                  >
                    <span>Head</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraHeadM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Head"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                      handleSnackBarPosition={handleSnackBarPosition}
                    />
                  )}
                  {/* Eyes */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraEyesM();
                    }}
                  >
                    <span>Eyes</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraEyesM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Eyes"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                      handleSnackBarPosition={handleSnackBarPosition}
                    />
                  )}
                  {/* Ears */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraEarsM();
                    }}
                  >
                    <span>Ears</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraEarsM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Ears"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                      handleSnackBarPosition={handleSnackBarPosition}
                    />
                  )}
                  {/* Nose */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraNoseM();
                    }}
                  >
                    <span>Nose</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraNoseM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Nose"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                      handleSnackBarPosition={handleSnackBarPosition}
                    />
                  )}
                  {/* Mouth */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraMouthM();
                    }}
                  >
                    <span>Mouth</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraMouthM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Mouth"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                      handleSnackBarPosition={handleSnackBarPosition}
                    />
                  )}

                  {/* Display bottom buttons */}
                  {extraM ? (
                    <ExtraMobileSympBtn toggleExtraM={toggleExtraM} />
                  ) : (
                    <MobileSympBtn toggleFunction={toggleWholeHeadM} />
                  )}
                </div>
              </div>
            )}
            {/* 6. Neck */}
            {neckM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Neck</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Neck" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleNeckM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleNeckM} />
                </div>
              </div>
            )}
            {/* 7. Chest */}
            {chestM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Chest & Upper abdomen</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Chest" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleChestM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleChestM} />
                </div>
              </div>
            )}
            {/* 8. UpperArm */}
            {upperArmM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Shoulder & Upper arm</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Shoulder" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleUpperArmM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleUpperArmM} />
                </div>
              </div>
            )}
            {/* 9. ForeArm */}
            {foreArmM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Forearm</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Forearm" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleForeArmM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleForeArmM} />
                </div>
              </div>
            )}
            {/* 10. MidAb */}
            {midAbM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Middle abdomen</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Middle abdomen" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleMidAbM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleMidAbM} />
                </div>
              </div>
            )}
            {/* 11. LowerAb */}
            {lowerAbM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Lower abdomen & Sexual organs</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Lower abdomen" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleLowerAbM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleLowerAbM} />
                </div>
              </div>
            )}
            {/* 12. Hand */}
            {handM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Hand</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Hand" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleHandM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleHandM} />
                </div>
              </div>
            )}
            {/* 13. Thigh */}
            {thighM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Pelvis, Gluteal & Thigh</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Pelvis, gluteal and thigh" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleThighM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleThighM} />
                </div>
              </div>
            )}
            {/* 14. Knee */}
            {kneeM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Knee</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Knee" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleKneeM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleKneeM} />
                </div>
              </div>
            )}
            {/* 15. LowerLeg */}
            {lowerLegM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Shin</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Shin" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleLowerLegM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleLowerLegM} />
                </div>
              </div>
            )}
            {/* 16. Foot */}
            {footM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list-header">
                  <span>Foot</span>
                </div>
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Foot" &&
                        symptom.status === "Approved" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleFootM}
                        handleSnackBarPosition={handleSnackBarPosition}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleFootM} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* MOBILE - Display selected symptoms */}
      <MobileSelectedSympBox
        patientForm={patientForm}
        dbSymps={dbSymps}
        handleDelete={handleDelete}
      />
      <div className="py-3"></div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Added symptom
        </Alert>
      </Snackbar>
    </div>
  );
}
