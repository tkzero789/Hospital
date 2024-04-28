import { useState, useRef, useEffect } from "react";
import removeAccents from "remove-accents";
import MaleFigure from "../../components/MaleFigure/MaleFigure";
import FemaleFigure from "../FemaleFigure/FemaleFigure";
import "../../css/sympchecker.css";
import MobileFemaleFigure from "../FemaleFigure/MobileFemaleFigure";

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
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleM, setIsVisibleM] = useState(false);
  const [isSwitch, setIsSwitch] = useState(true);

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

  // Toggle
  const toggleWholeHeadM = () => {
    setWholeHeadM(!wholeHeadM);
  };

  const toggleNeckM = () => {
    setNeckM(!neckM);
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

  // Toggle Search Bar button (left)
  const toggleSearchBar = (e) => {
    e.preventDefault();
    setIsVisible(true);
    setIsVisibleM(false);
    setIsSwitch(true);
  };

  // Toggle Figure figure button (right)
  const toggleMobileFigure = (e) => {
    e.preventDefault();
    setIsVisible(false);
    setIsVisibleM(true);
    setIsSwitch(false);
  };

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
      <div className="switch-button">
        <button
          onClick={toggleSearchBar}
          className={`${isSwitch ? "active-switch-button" : ""}`}
        >
          Tìm kiếm
        </button>
        <button
          onClick={toggleMobileFigure}
          className={`${isSwitch ? "" : "active-switch-button"}`}
        >
          Chọn trên hình
        </button>
      </div>
      <div className="symp-big-box">
        <div className="big-box-wrapper">
          {/* Left box */}
          <div
            className="symp-left-box"
            style={{ display: isVisible ? "block" : "none" }}
          >
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
                <div className="search-symp-button">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplaySearch(false);
                      window.scrollTo({ top: 500, left: 0 });
                    }}
                  >
                    <i className="bi bi-arrow-right-square-fill"></i>
                  </button>
                </div>
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
          {/* Right box */}
          <div className="symp-right-box">
            <div className="right-box-wrapper">
              <div className="human-figure">
                {patientForm.patientGender === "Nữ" && (
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
                {patientForm.patientGender === "Nam" && (
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
                {/* 11. LowerAbPrivate */}
                {showLowerAbSymptoms && (
                  <div
                    ref={lowerAbRef}
                    className="lowerAbPrivate-symptoms-list"
                  >
                    {dbSymps
                      .filter((symptom) => symptom.position === "Vùng dưới")
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
                {/* 12. Hand */}
                {showHandSymptoms && (
                  <div ref={handRef} className="hand-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Bàn tay")
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
                {/* 13. Thigh */}
                {showThighSymptoms && (
                  <div ref={thighRef} className="thigh-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) => symptom.position === "Hông, đùi và mông"
                      )
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
                {/* 14. Knee */}
                {showKneeSymptoms && (
                  <div ref={kneeRef} className="knee-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Đầu gối")
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
                {/* 15. LowerLeg */}
                {showLowerLegSymptoms && (
                  <div ref={lowerLegRef} className="lowerLeg-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Cẳng chân")
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
                {/* 16. Foot */}
                {showFootSymptoms && (
                  <div ref={footRef} className="foot-symptoms-list">
                    {dbSymps
                      .filter((symptom) => symptom.position === "Bàn chân")
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
          {/* Mobile right box */}
          <div
            className="mobile-right-box"
            style={{ display: isVisibleM ? "block" : "none" }}
          >
            <div className="right-box-wrapper">
              <div className="human-figure">
                {patientForm.patientGender === "Nữ" && (
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
                {/* 1-5. WholeHead */}
                {wholeHeadM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
                      <span>Triệu chứng ở đầu</span>
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
                      <span>Triệu chứng ở mắt</span>
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
                      <span>Triệu chứng ở tai</span>
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
                      <span>Triệu chứng ở mũi</span>
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
                      <span>Triệu chứng ở miệng</span>
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
                      {/* Button */}
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWholeHeadM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWholeHeadM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 6. Neck */}
                {neckM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleNeckM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleNeckM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 7. Chest */}
                {chestM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleChestM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleChestM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 8. UpperArm */}
                {upperArmM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleUpperArmM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleUpperArmM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 9. ForeArm */}
                {foreArmM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleForeArmM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleForeArmM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 10. MidAb */}
                {midAbM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMidAbM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMidAbM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 11. LowerAb */}
                {lowerAbM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
                      {dbSymps
                        .filter((symptom) => symptom.position === "Vùng dưới")
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLowerAbM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLowerAbM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 12. Hand */}
                {handM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
                      {dbSymps
                        .filter((symptom) => symptom.position === "Bàn tay")
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleHandM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleHandM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 13. Thigh */}
                {thighM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
                      {dbSymps
                        .filter(
                          (symptom) => symptom.position === "Hông, đùi và mông"
                        )
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleThighM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleThighM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 14. Knee */}
                {kneeM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
                      {dbSymps
                        .filter((symptom) => symptom.position === "Đầu gối")
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleKneeM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleKneeM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 15. LowerLeg */}
                {lowerLegM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
                      {dbSymps
                        .filter((symptom) => symptom.position === "Cẳng chân")
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLowerLegM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLowerLegM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* 16. Foot */}
                {footM && (
                  <div className="mobile-symp-background">
                    <div className="mobile-symptoms-list">
                      {dbSymps
                        .filter((symptom) => symptom.position === "Bàn chân")
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
                      <div className="mobile-symp-list-button">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFootM();
                          }}
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFootM();
                            window.scrollTo({ top: 800, left: 0 });
                          }}
                        >
                          Xác nhận chọn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Display selected symptoms */}
      <div
        id="mobile-selected-symp-box"
        className="mobile-selected-symp-box"
        style={{ display: isVisibleM ? "block" : "none" }}
      >
        <div className="selected-symp-header">
          <span>Các triệu chứng đã chọn:</span>
        </div>
        {patientForm.chosenSymps.map((symptomId) => {
          const symptom = dbSymps.find((symptom) => symptom.id === symptomId);
          return (
            <div className="selected-symp-item" key={symptomId}>
              <div className="selected-symp-name">{symptom.name}</div>
              <button onClick={(event) => handleDelete(event, symptomId)}>
                <i className="bi bi-x-circle-fill"></i>
              </button>
            </div>
          );
        })}
      </div>
      <div className="row pt-3 pb-3"></div>
    </div>
  );
};

export default PatientFormSymptoms;
