import NotFoundImg from "assets/icons/404-page-not-found.svg";
import "pages/NotFound/NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <div className="content-container">
          <div className="not-found__section">
            <img src={NotFoundImg} alt="error" />
            <span>
              The page you are looking for is not found or never existed.
            </span>

            <Link to="/home">Back to home</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
