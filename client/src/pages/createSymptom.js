import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";

import AdminNavBar from "../components/AdminNavBar";

const Record = (props) => (
  <div className="col-3 pb-3">
    <div className="form-check">
      <input className="form-check-input p-1" type="checkbox" value=""></input>
      <Link className="text-danger" to={`/create-details/${props.record._id}`}>
        <h5>{props.record.name}</h5>
      </Link>
    </div>
  </div>
);
export default function CreateSymptom() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", position: "", level: "" });
    navigate("/");
  }

  const [records, setRecords] = useState([]);
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  function recordList() {
    return records.map((record) => {
      return <Record record={record} />;
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
          <form onSubmit={onSubmit}>
            <h4 className="card-title text-danger">TRIỆU CHỨNG ĐÃ CÓ</h4>

            <div className="row pt-3 pb-3">{recordList()}</div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <input
                  type="submit"
                  value="XÓA TRIỆU CHỨNG"
                  className="btn btn-outline-danger"
                />
              </div>
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
