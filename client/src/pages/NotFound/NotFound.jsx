import { Link } from "react-router-dom";
import NotFoundImg from "assets/icons/404-page-not-found.svg";
import Footer from "components/HomePage/Footer/Footer";
import "pages/NotFound/NotFound.scss";

const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <div className="content-container">
          <div className="not-found__section">
            <img src={NotFoundImg} alt="error" />
            <span>
              The page you requested could not be found. It may never have
              existed, or the URL may be incorrect.
            </span>

            <Link to="/home">Back to home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
