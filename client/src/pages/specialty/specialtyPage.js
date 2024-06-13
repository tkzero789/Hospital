import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeartSVG from "assets/home/heartSVG.svg";
import BoneSVG from "assets/home/boneSVG.svg";
import MedicationSVG from "assets/home/medicationSVG.svg";
import FileSVG from "assets/home/fileSVG.svg";
import HandSVG from "assets/home/handSVG.svg";
import RibbonSVG from "assets/home/ribbonSVG.svg";
import ProtectionSVG from "assets/home/protectionSVG.svg";
import DnaSVG from "assets/home/dnaSVG.svg";
import Footer from "components/HomePage/Footer/Footer";
import "pages/specialty/specialtypage.css";

const SpecialtyPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Specialty</title>
        </Helmet>
      </HelmetProvider>
      <div className="specialty-list w-100">
        <div className="content-container">
          <h1>Specialty</h1>
          <div className="specialty-list-wrapper">
            <div className="specialty-item">
              <img src={HeartSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Cardiology</h4>
                <div className="specialty-info-text">
                  <p>
                    Cardiology is the medical treatment of diseases of the heart
                    and parts of the circulatory system. Cardiologists are the
                    doctors who specialize in diagnosing and treating these
                    conditions.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/cardiology">View more</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={BoneSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Orthopedics</h4>
                <div className="specialty-info-text">
                  <p>
                    Orthopedists are doctors who take care of the entire
                    musculoskeletal system. They diagnose and treat conditions
                    such sprains, strains, broken bones, arthritis and
                    osteoporosis. Some of the treatments they offer include
                    recommending lifestyle changes, applying casts and
                    performing surgeries, such as ligament repairs or total
                    joint replacements.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/orthopedics">View more</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={MedicationSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Surgery</h4>
                <div className="specialty-info-text">
                  <p>
                    Surgery is a branch of medicine that involves treating
                    diseases or injuries by adjusting or removing organs,
                    tissues or bones. Surgery includes both necessary
                    procedures, like cardiac surgery, or elective procedures,
                    such as joint replacement.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/surgery">View more</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={FileSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Pediatricians</h4>
                <div className="specialty-info-text">
                  <p>
                    Pediatric Primary Care is focused specifically on infants,
                    children and adolescents up to 21 years old. At AdventHealth
                    Medical Group, our pediatricians are passionate about
                    enhancing the lives of children and their families by
                    providing the highest quality medical care with compassion
                    and respect.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/pediatricians">View more</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={HandSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Diabetes</h4>
                <div className="specialty-info-text">
                  <p>
                    Diabetes is a disease that affects the body's production of
                    glucose and insulin levels. Type 1 diabetes occurs when the
                    pancreas doesn't produce enough insulin. Type 2, gestational
                    and prediabetes are all a result of an excess amount of
                    sugar in the blood (high glucose levels).
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/diabetes">View more</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={RibbonSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Women's care</h4>
                <div className="specialty-info-text">
                  <p>
                    Whether you're in adolescence, menopause or somewhere in
                    between, your health needs come first. Our women's care
                    specialists are committed to making sure that happens as
                    they support you through every stage of life.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/women-care">View more</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={ProtectionSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Family Medicine</h4>
                <div className="specialty-info-text">
                  <p>
                    Family medicine refers to primary medical services offered
                    to patients of all ages, from newborn to adult. These
                    services can include everything from routine check-ups and
                    preventive health screenings to care for acute illnesses
                    such as the cold and flu; management of chronic conditions
                    such as asthma, arthritis, hypertension, obesity and
                    diabetes; care for minor injuries; flu shots and
                    immunizations; and other non-emergency procedures.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/family-medicine">View more</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={DnaSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Neurology</h4>
                <div className="specialty-info-text">
                  <p>
                    Neurological care is the practice of medicine that focuses
                    on the diagnosis, treatment and function of diseases
                    relating to the nerves and nervous system. Neurologists and
                    neurosurgeons treat disorders that affect the brain or
                    spinal cord.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/neurology">View more</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialtyPage;
