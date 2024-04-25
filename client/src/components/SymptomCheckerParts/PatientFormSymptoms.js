import { useState, useRef, useEffect } from "react";
import "../../css/sympchecker.css";
import removeAccents from "remove-accents";
import MaleFigure from "../../components/MaleFigure/MaleFigure";

// Render each symptom
const Symptom = (props) => {
  return (
    <div className="form">
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="checkbox"
          checked={props.isChecked}
          onChange={() => {
            props.onCheck(props.symptom._id, props.symptom.name);
          }}
        />
        <span className="search-symp-name">{props.symptom.name}</span>
      </label>
    </div>
  );
};

const PatientFormSymptoms = ({ dbSymps, patientForm, setPatientForm }) => {
  const onCheck = (symptomId) => {
    if (patientForm.chosenSymps.includes(symptomId)) {
      setPatientForm({
        ...patientForm,
        chosenSymps: patientForm.chosenSymps.filter(
          (chosenId) => chosenId !== symptomId
        ),
        chosenCats: patientForm.chosenCats.filter(
          (chosenCat) => chosenCat.sympId !== symptomId
        ),
        chosenDes: patientForm.chosenDes.filter(
          (chosenDes) => chosenDes.sympId !== symptomId
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
  const headRef = useRef();
  const eyesRef = useRef();
  const earsRef = useRef();
  const noseRef = useRef();
  const mouthRef = useRef();
  const neckRef = useRef();

  // For displaying symptoms box next to figure
  const [showHeadSymptoms, setShowHeadSymptoms] = useState(false);
  const [showEyesSymptoms, setShowEyesSymptoms] = useState(false);
  const [showEarsSymptoms, setShowEarsSymptoms] = useState(false);
  const [showNoseSymptoms, setShowNoseSymptoms] = useState(false);
  const [showMouthSymptoms, setShowMouthSymptoms] = useState(false);
  const [showNeckSymptoms, setShowNeckSymptoms] = useState(false);

  // Click outside to close symptoms box next to figure
  useEffect(() => {
    function handleClickOutside(event) {
      // Head
      if (headRef.current && !headRef.current.contains(event.target)) {
        setShowHeadSymptoms(false);
      }
      // Eyes
      if (eyesRef.current && !eyesRef.current.contains(event.target)) {
        setShowEyesSymptoms(false);
      }
      // Ears
      if (earsRef.current && !earsRef.current.contains(event.target)) {
        setShowEarsSymptoms(false);
      }
      // Nose
      if (noseRef.current && !noseRef.current.contains(event.target)) {
        setShowNoseSymptoms(false);
      }
      // Mouth
      if (mouthRef.current && !mouthRef.current.contains(event.target)) {
        setShowMouthSymptoms(false);
      }
      // Neck
      if (neckRef.current && !neckRef.current.contains(event.target)) {
        setShowNeckSymptoms(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle symptoms box next to figure
  const toggleHeadSymptoms = () => {
    setShowHeadSymptoms(!showHeadSymptoms); // Head
    setShowEyesSymptoms(false); // Eyes
    setShowEarsSymptoms(false); // Ears
    setShowNoseSymptoms(false); // Nose
    setShowMouthSymptoms(false); // Mouth
  };
  const toggleEyesSymptoms = () => {
    setShowEyesSymptoms(!showEyesSymptoms); // Eyes
    setShowHeadSymptoms(false); // Head
    setShowEarsSymptoms(false); // Ears
    setShowNoseSymptoms(false); // Nose
    setShowMouthSymptoms(false); // Mouth
    setShowNeckSymptoms(false); // Neck
  };
  const toggleEarsSymptoms = () => {
    setShowEarsSymptoms(!showEarsSymptoms); // Ears
    setShowHeadSymptoms(false); // Head
    setShowEyesSymptoms(false); // Eyes
    setShowNoseSymptoms(false); // Nose
    setShowMouthSymptoms(false); // Mouth
    setShowNeckSymptoms(false); // Neck
  };
  const toggleNoseSymptoms = () => {
    setShowNoseSymptoms(!showNoseSymptoms); // Nose
    setShowHeadSymptoms(false); // Head
    setShowEyesSymptoms(false); // Eyes
    setShowEarsSymptoms(false); // Ears
    setShowMouthSymptoms(false); // Mouth
    setShowNeckSymptoms(false); // Neck
  };
  const toggleMouthSymptoms = () => {
    setShowMouthSymptoms(!showMouthSymptoms); // Mouth
    setShowHeadSymptoms(false); // Head
    setShowEyesSymptoms(false); // Eyes
    setShowEarsSymptoms(false); // Ears
    setShowNoseSymptoms(false); // Nose
    setShowNeckSymptoms(false); // Neck
  };
  const toggleNeckSymptoms = () => {
    setShowNeckSymptoms(!showNeckSymptoms); // Neck
    setShowHeadSymptoms(false); // Head
    setShowEyesSymptoms(false); // Eyes
    setShowEarsSymptoms(false); // Ears
    setShowNoseSymptoms(false); // Nose
    setShowMouthSymptoms(false); // Mouth
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

  // The UI
  return (
    <div>
      <div className="pb-5 text-center">
        <h4 className="text-blue-1 fw-med">
          Hãy chọn triệu chứng mà bạn đang gặp phải
        </h4>
      </div>
      <h5 className="card-title text-blue-1 fw-med text-blue-2">
        Triệu chứng phổ biến
      </h5>
      <div className="symp-big-box">
        <div className="big-box-wrapper">
          <div className="symp-left-box">
            <div className="left-box-wrapper">
              {/* Search */}
              <div className="search-symp-input">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm kiếm triệu chứng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Search results*/}
              {searchTerm && displaySearch && (
                <div className="search-symp-display" ref={searchSympRef}>
                  {filteredSymps.map((symptom) => {
                    return (
                      <Symptom
                        symptom={symptom}
                        onCheck={() => onCheck(symptom.id)}
                        isChecked={patientForm.chosenSymps.includes(symptom.id)}
                        key={symptom.id}
                      />
                    );
                  })}
                </div>
              )}
              {/* Display selected symptoms */}
              <div className="selected-symp-box">
                <div className="selected-symp-header">
                  <span>Các triệu chứng đã chọn:</span>
                </div>
                {patientForm.chosenSymps.map((symptomId) => {
                  const symptom = dbSymps.find(
                    (symptom) => symptom.id === symptomId
                  );
                  return (
                    <div className="selected-symp-item">
                      <div className="selected-symp-name" key={symptomId}>
                        {symptom.name}
                      </div>
                      <button
                        onClick={(event) => handleDelete(event, symptomId)}
                      >
                        <i class="bi bi-x-circle-fill"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="symp-right-box">
            <div className="right-box-wrapper">
              <div className="human-figure">
                <MaleFigure
                  toggleHeadSymptoms={toggleHeadSymptoms}
                  toggleEyesSymptoms={toggleEyesSymptoms}
                  toggleEarsSymptoms={toggleEarsSymptoms}
                  toggleNoseSymptoms={toggleNoseSymptoms}
                  toggleMouthSymptoms={toggleMouthSymptoms}
                  toggleNeckSymptoms={toggleNeckSymptoms}
                />
                {/* Head */}
                {showHeadSymptoms && (
                  <div ref={headRef} className="head-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Đầu")
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={() => onCheck(symptom.id)}
                          isChecked={patientForm.chosenSymps.includes(
                            symptom.id
                          )}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* Eyes */}
                {showEyesSymptoms && (
                  <div ref={eyesRef} className="eyes-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Mắt")
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={() => onCheck(symptom.id)}
                          isChecked={patientForm.chosenSymps.includes(
                            symptom.id
                          )}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* Ears */}
                {showEarsSymptoms && (
                  <div ref={earsRef} className="ears-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Tai")
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={() => onCheck(symptom.id)}
                          isChecked={patientForm.chosenSymps.includes(
                            symptom.id
                          )}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* Nose */}
                {showNoseSymptoms && (
                  <div ref={noseRef} className="nose-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Mũi")
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={() => onCheck(symptom.id)}
                          isChecked={patientForm.chosenSymps.includes(
                            symptom.id
                          )}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* Mouth */}
                {showMouthSymptoms && (
                  <div ref={mouthRef} className="mouth-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Miệng")
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={() => onCheck(symptom.id)}
                          isChecked={patientForm.chosenSymps.includes(
                            symptom.id
                          )}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* Neck */}
                {showNeckSymptoms && (
                  <div ref={neckRef} className="neck-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Cổ")
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={() => onCheck(symptom.id)}
                          isChecked={patientForm.chosenSymps.includes(
                            symptom.id
                          )}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-3 pb-3"></div>
    </div>
  );
};

export default PatientFormSymptoms;
