import React from "react";
import { Link } from "react-router-dom";
import "components/HomePage/ConvenienceCenter/convcenter.css";

export default function ConvenienceCenter() {
  return (
    <>
      {/* OPTIONS SECTION */}
      <section className="options w-100">
        <div className="content-container">
          <div className="opt-big-header">
            <div className="opt-big-header-text">Convenience Center </div>
          </div>
          <div className="options-wrapper">
            <div className="c-6 md-12">
              <div className="opt-section">
                <div className="opt-header">
                  <div className="opt-header-text">Virtual Care</div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Personal Health Checkup</div>
                  <div className="opt-body">
                    Explore your health and get personalized insights with our
                    quick and confidential online checkup tool.
                  </div>
                  <div className="opt-btn-wrapper">
                    <Link className="opt-btn-link" to="/symptom-checker">
                      Diagnose
                    </Link>
                  </div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Schedule an appointment</div>
                  <div className="opt-body">
                    We make it easy! Skip the wait. Just hop online and pick a
                    time that works best for you.
                  </div>
                  <div className="opt-btn-wrapper">
                    <Link className="opt-btn-link" to="/appt-request">
                      Schedule
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-6 md-12">
              <div className="opt-section">
                <div className="opt-header">
                  <div className="opt-header-text">Care Connect</div>
                </div>
                <div className="big-opt-box">
                  <div className="box-select">
                    <Link className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-question-circle"></i>
                      </div>
                      <div className="box-text">Consultation</div>
                    </Link>
                  </div>
                  <div className="box-select">
                    <Link to="/specialty-page" className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-lungs"></i>
                      </div>
                      <div className="box-text">Specialty</div>
                    </Link>
                  </div>
                  <div className="box-select">
                    <Link to="/work-schedule" className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-hospital"></i>
                      </div>
                      <div className="box-text">Emergency</div>
                    </Link>
                  </div>
                  <div className="box-select">
                    <Link className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-calendar-heart"></i>
                      </div>
                      <div className="box-text">Network</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
