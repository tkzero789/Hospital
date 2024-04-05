import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminNavBar from "../components/AdminNavBar";
import DoctorNav from "../components/DoctorNav";

const Disease = (props) => (
  <div className="disease-item d-flex px-0 py-0 ms-3 my-2 ">
    <div className="d-flex border border-secondary-subtle shadow-sm rounded">
      <div
        className="disease-item py-0 px-0 b rounded-start px-3 py-2"
        style={{ display: "flex" }}
      >
        <Link
          className="text-body text-decoration-none"
          to={`/edit-disease/${props.disease._id}`}
        >
          <div>{props.disease.name}</div>
        </Link>
      </div>
      <div>
        <Link
          to={`/edit-disease/${props.disease._id}`}
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
              props.onDelete(props.disease._id);
            }}
          ></i>
        </Link>
      </div>
    </div>
  </div>
);

export default function DiseaseList() {
  const [diseases, setDiseases] = useState([]);
  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-backend.onrender.com/disease/`)
      .then((res) => {
        const diseases = res.data;
        setDiseases(diseases);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [diseases.length]);

  async function onDelete(id) {
    if (window.confirm("Are you sure you want to delete this disease?")) {
      axios
        .delete(
          `https://symptom-checker-with-mern-backend.onrender.com/disease/${id}`
        )
        .then(() => {
          const newDiseases = diseases.filter((disease) => disease._id !== id);
          setDiseases(newDiseases);
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  function diseaseList() {
    return diseases.map((disease) => {
      return (
        <Disease
          disease={disease}
          onDelete={() => onDelete(disease._id)}
          key={disease._id}
        />
      );
    });
  }

  return (
    <>
      <div>
        <DoctorNav />
        <AdminNavBar />
        <h4 className="container text-center text-body pt-5">
          DANH SÁCH BỆNH ĐÃ TẠO
        </h4>
        <div className="container p-5">
          <div className="border border-secondary border-opacity-25 rounded shadow p-5">
            <form>
              <h4 className="card-title text-body">Những bệnh đã có:</h4>

              <div className="row d-flex px-3 pt-2 pb-2">{diseaseList()}</div>

              <div className="d-flex justify-content-evenly row pt-3">
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-primary bg-gradient"
                    to="/create-disease"
                  >
                    TẠO CĂN BỆNH MỚI
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
