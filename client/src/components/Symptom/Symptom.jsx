import React from "react";

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

export default Symptom;
