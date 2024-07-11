import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "components/HomePage/Footer/Footer";
import "pages/WorkSchedule/WorkSchedule.scss";

const WorkSchedule = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Business hours</title>
        </Helmet>
      </HelmetProvider>
      <div className="work">
        <div className="content-container">
          <div className="work-wrapper">
            <h1>BaySide Hospital business hours</h1>
            <h2>Emergency room 24/7</h2>
            <ul>
              <li>
                Customers who require emergency services, emergency
                transportation, and internal medicine examinations are served 24
                hours a day.
              </li>
              <li>
                The operating room, imaging diagnostics, and laboratory systems
                operate 24 hours a day to meet emergency needs.
              </li>
            </ul>
            <h2>Clinic's business hours</h2>
            <p>Monday - Friday</p>
            <ul>
              <li>Morning: 7:30 am - 12:00 pm</li>
              <li>Afternoon: 1:30 pm - 5:00 pm</li>
            </ul>
            <p>Saturday - Sunday</p>
            <ul>
              <li>Morning: 7:30 am - 11:30 am</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkSchedule;
