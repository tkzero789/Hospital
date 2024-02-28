import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { v4 as uuidv4 } from "uuid";

import AdminNavBar from "../components/AdminNavBar";
import ExistedSymptoms from "../components/ExistedSymptoms";
import ExistedDetails from "../components/ExistedDetails";
import MoreSymptoms from "../components/MoreSymptoms";
import WriteArticle from "../components/WriteAriticle";

export default function CreateAritcle() {
  const [form, setForm] = useState([
    // {
    //   index: uuidv4(),
    //   symptomName: "",
    //   categories: [
    //     {
    //       index: uuidv4(),
    //       categoryName: "Vị trí",
    //       descriptions: [
    //         {
    //           index: uuidv4(),
    //           descriptionDetail: "",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);

  const title = {
    0: "Existed Symptoms",
    1: "Existed Details",
    2: "More Symptoms",
    3: "Write Article",
  };

  const [step, setStep] = useState(0);

  const StepDisplay = () => {
    if (step === 0) {
      return <ExistedSymptoms form={form} setForm={setForm} />;
    } else if (step === 1) {
      return <ExistedDetails form={form} setForm={setForm} />;
    } else if (step === 2) {
      return <MoreSymptoms form={form} setForm={setForm} />;
    } else {
      return <WriteArticle form={form} setForm={setForm} />;
    }
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
    console.log(step);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
    console.log(step);
  };

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <AdminNavBar />
      <h3 className="container text-center text-danger pt-5">TẠO BÀI VIẾT</h3>
      <div className="container p-5">
        <div className="card border-danger-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={step == 0}
                  onClick={handlePrev}
                >
                  QUAY LẠI
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={step == 3}
                  onClick={handleNext}
                >
                  TIẾP THEO
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
