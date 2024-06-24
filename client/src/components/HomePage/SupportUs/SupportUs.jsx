import { Link } from "react-router-dom";
import "components/HomePage/SupportUs/Supportus.scss";

const SupportUs = () => {
  return (
    <>
      <section className="extra w-100">
        <div className="extra__background"></div>
        <div className="extra__info">
          <div className="extra-text extra__text">
            <h4>
              Join us in making a difference at BaySide Hospital by lending your
              support today.
            </h4>
            <hr />
            <p>
              Your help will enable us to provide the best care for our
              community, ensuring that every patient receives the attention and
              treatment they deserve. Together, we can create a healthier future
              for everyone.
            </p>
          </div>
          <div className="extra__btn">
            <Link>Support us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportUs;
