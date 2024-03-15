import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminNavBar from "../components/AdminNavBar";
import DoctorNav from "../components/DoctorNav";
import ApptForm from "../components/ApptForm";

const Symptom = (props) => (
  <div className="symptom-item d-flex px-0 py-0 ms-3 my-2 ">
    <div className="d-flex border border-secondary-subtle shadow-sm rounded">
      <div
        className="symptom-item py-0 px-0 b rounded-start px-3 py-2"
        style={{ display: "flex" }}
      >
        <Link
          className="text-body text-decoration-none"
          to={`/edit-symptom/${props.symptom._id}`}
        >
          <div>{props.symptom.name}</div>
        </Link>
      </div>
      <div>
        <Link
          to={`/edit-symptom/${props.symptom._id}`}
          className="rounded position-absolute bg-success bg-gradient py-2 px-3 ms-3"
        >
          <i className="text-light text-opacity-75 bi bi-pencil"></i>
        </Link>
      </div>
      <div>
        <Link>
          <i
            className="rounded position-absolute bg-danger bg-gradient bi bi-trash-fill text-light text-opacity-75 py-2 px-3 ms-7"
            onClick={() => {
              props.onDelete(props.symptom._id);
            }}
          ></i>
        </Link>
      </div>
    </div>
  </div>
);

export default function CreateSymptom() {
  const [symptoms, setSymptoms] = useState([]);
  useEffect(() => {
    async function getSymptoms() {
      const response = await fetch(`http://localhost:5000/symptom/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const symptoms = await response.json();
      setSymptoms(symptoms);
    }
    getSymptoms();
    return;
  }, [symptoms.length]);

  async function onDelete(id) {
    if (window.confirm("Are you sure you want to delete this symptom?")) {
      await fetch(`http://localhost:5000/symptom/${id}`, {
        method: "DELETE",
      });

      const newSymptoms = symptoms.filter((symptom) => symptom._id !== id);
      setSymptoms(newSymptoms);
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
    <>
      <div>
        <DoctorNav />
        <AdminNavBar />
        <h4 className="container text-center text-body pt-5">
          TẠO TRIỆU CHỨNG VÀ MÔ TẢ
        </h4>
        <div className="container p-5">
          <div className="border border-secondary border-opacity-25 rounded shadow p-5">
            <form>
              <h4 className="card-title text-body">Triệu chứng đã có:</h4>

              <div className="row d-flex px-3 pt-2 pb-2">{symptomList()}</div>

              <div className="d-flex justify-content-evenly row pt-3">
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-primary bg-gradient"
                    to="/new-symptom"
                  >
                    TẠO TRIỆU CHỨNG MỚI
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
