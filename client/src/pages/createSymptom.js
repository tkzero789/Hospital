import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import AdminNavBar from "../components/AdminNavBar";

const Symptom = (props) => (
  <div className="col-3 pb-3">
    <div className="form" style={{ display: "flex" }}>
      <i
        class="bi bi-trash text-danger"
        style={{ marginRight: "5px" }}
        onClick={() => {
          props.onDelete(props.symptom._id);
        }}
      ></i>
      <Link className="text-danger" to={`/edit-symptom/${props.symptom._id}`}>
        <h5>{props.symptom.name}</h5>
      </Link>
    </div>
  </div>
);

export default function CreateSymptom() {
  const [symptoms, setSymptoms] = useState([]);
  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-backend.onrender.com/symptom/`)
      .then((res) => {
        const symptoms = res.data;
        setSymptoms(symptoms);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [symptoms.length]);

  async function onDelete(id) {
    if (window.confirm("Are you sure you want to delete this symptom?")) {
      axios
        .delete(
          `https://symptom-checker-with-mern-backend.onrender.com/symptom/${id}`
        )
        .then(() => {
          const newSymptoms = symptoms.filter((symptom) => symptom._id !== id);
          setSymptoms(newSymptoms);
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  function symptomList() {
    return symptoms.map((symptom) => {
      return (
        <Symptom
          symptom={symptom}
          onDelete={() => onDelete(symptom._id)}
          key={symptom._id}
        />
      );
    });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <AdminNavBar />
      <h3 className="container text-center text-danger pt-5">
        TẠO TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-danger-subtle p-5">
          <form>
            <h4 className="card-title text-danger">TRIỆU CHỨNG ĐÃ CÓ</h4>

            <div className="row pt-3 pb-3">{symptomList()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink className="btn btn-outline-danger" to="/new-symptom">
                  TẠO TRIỆU CHỨNG MỚI
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
