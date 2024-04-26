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
  const [showMidAbSymptoms, setShowMidAbSymptoms] = useState(false); // 10/ MidAb

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
      closeSymptoms(midAbRef, setShowMidAbSymptoms); // 10/ MidAb
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
                    <div className="selected-symp-item" key={symptomId}>
                      <div className="selected-symp-name">{symptom.name}</div>
                      <button
                        onClick={(event) => handleDelete(event, symptomId)}
                      >
                        <i className="bi bi-x-circle-fill"></i>
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
                  toggleChestSymptoms={toggleChestSymptoms}
                  toggleUpperArmSymptoms={toggleUpperArmSymptoms}
                  toggleForeArmSymptoms={toggleForeArmSymptoms}
                  toggleMidAbSymptoms={toggleMidAbSymptoms}
                />
                {/* 1. Head */}
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
                {/* 2. Eyes */}
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
                {/* 3. Ears */}
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
                {/* 4. Nose */}
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
                {/* 5. Mouth */}
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
                {/* 6. Neck */}
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
                {/* 7. Chest */}
                {showChestSymptoms && (
                  <div ref={chestRef} className="chest-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Ngực")
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
                {/* 8. UpperArm */}
                {showUpperArmSymptoms && (
                  <div ref={upperArmRef} className="upperArm-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Vai")
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
                {/* 9. ForeArm */}
                {showForeArmSymptoms && (
                  <div ref={foreArmRef} className="foreArm-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Cánh tay")
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
                {/* 10. MidAb */}
                {showMidAbSymptoms && (
                  <div ref={midAbRef} className="midAb-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Bụng")
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
