import React from "react";
import { Link } from "react-router-dom";
import "components/HomePage/ConvenienceCenter/Convcenter.scss";

export default function ConvenienceCenter() {
  return (
    <>
      {/* OPTIONS SECTION */}
      <section className="options w-100">
        <div className="content-container">
          <div className="options__header">
            <span>Convenience Center</span>
          </div>
          <div className="options__wrapper">
            <div className="c-6 md-12">
              <div className="options__section">
                <div className="options__sub-header">
                  <span>Virtual Care</span>
                </div>
                <div className="options__box">
                  <div className="options__box-title">
                    Personal Health Checkup
                  </div>
                  <div className="options__box-body">
                    Explore your health and get personalized insights with our
                    quick and confidential online checkup tool.
                  </div>
                  <div className="options__btn-wrapper">
                    <Link to="/symptom-checker">Diagnose</Link>
                  </div>
                </div>
                <div className="options__box">
                  <div className="options__box-title">
                    Schedule an appointment
                  </div>
                  <div className="options__box-body">
                    We make it easy! Skip the wait. Just hop online and pick a
                    time that works best for you.
                  </div>
                  <div className=" options__btn-wrapper">
                    <Link to="/appt-request">Schedule</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-6 md-12">
              <div className="options__section">
                <div className="options__sub-header">
                  <span>Care Connect</span>
                </div>
                <div className="options__box--big">
                  <div className="options__select">
                    <Link>
                      <div className="options__select-icon">
                        <i className="bi bi-question-circle"></i>
                      </div>
                      <div className="options__select-text">Consultation</div>
                    </Link>
                  </div>
                  <div className="options__select">
                    <Link to="/specialty-page">
                      <div className="options__select-icon">
                        <i className="bi bi-lungs"></i>
                      </div>
                      <div className="options__select-text">Specialty</div>
                    </Link>
                  </div>
                  <div className="options__select">
                    <Link to="/work-schedule">
                      <div className="options__select-icon">
                        <i className="bi bi-hospital"></i>
                      </div>
                      <div className="options__select-text">Emergency</div>
                    </Link>
                  </div>
                  <div className="options__select">
                    <Link>
                      <div className="options__select-icon">
                        <i className="bi bi-calendar-heart"></i>
                      </div>
                      <div className="options__select-text">Network</div>
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
