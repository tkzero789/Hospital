import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

import AdminNavBar from "../components/Navbar/AdminNavBar";
import DoctorNav from "../components/Navbar/DoctorNav";

export default function DiseaseList({ userInfos }) {
  const [diseases, setDiseases] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/`)
      .then((res) => {
        const diseases = res.data;
        setDiseases(diseases);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseases.length]);

  // delete disease
  async function onDelete(id) {
    if (window.confirm("Bạn có chắc muốn xóa căn bệnh này?")) {
      axios
        .delete(`http://localhost:5000/disease/${id}`)
        .then(() => {
          const newDiseases = diseases.filter((disease) => disease.id !== id);
          setDiseases(newDiseases);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  // display each disease
  const Disease = ({ disease, onDelete }) => (
    <div className="disease-item d-flex px-0 py-0 ms-3 my-2 ">
      <div className="d-flex border border-secondary-subtle shadow-sm rounded">
        <div
          className="disease-item py-0 px-0 b rounded-start px-3 py-2"
          style={{ display: "flex" }}
        >
          <Link
            className="text-body text-decoration-none"
            to={`/disease/${disease.id}/view`}
          >
            <div>{disease.name}</div>
          </Link>
        </div>
        {userInfos.doctorID === disease.createInfos.doctorID && (
          <div>
            <div>
              <Link
                to={`/disease/${disease.id}/edit`}
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
                    onDelete(disease.id);
                  }}
                ></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // display disease list
  function diseaseList() {
    return diseases.map((disease) => {
      return (
        <Disease
          disease={disease}
          onDelete={() => onDelete(disease.id)}
          key={disease.id}
        />
      );
    });
  }

  return (
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
                  to="/disease/create"
                >
                  TẠO CĂN BỆNH MỚI
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
