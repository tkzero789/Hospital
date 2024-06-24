import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import TodayIcon from "@mui/icons-material/Today";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "auth/AuthContext";
import BaySideLogo from "assets/icons/BaySide-logo-2.svg";
import "components/Navbar/Sidebar/Sidebar.scss";

export default function Sidebar() {
  const { logout, getUserRole } = useAuth();
  const userRole = getUserRole();
  const navigate = useNavigate();

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("No token found in storage");
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "http://localhost:5000/signout",
        null,
        config
      );
      console.log("Signed out");
      logout();
      navigate("/home");
    } catch (err) {
      const message = `Error: ${err}`;
      window.alert(message);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <NavLink
          className="logo-link"
          to="/staff-home"
          style={{ textDecoration: "none" }}
        >
          <div className="admin-logo">
            <img src={BaySideLogo} alt="hospital logo" />
          </div>
        </NavLink>
      </div>

      <div className="center">
        <ul>
          <li>
            <NavLink to="/symptom-table" activeclassname="active">
              <MonitorHeartIcon className="icon" />
              <span>Symptoms</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/disease-table" activeclassname="active">
              <MedicalServicesIcon className="icon" />
              <span>Diseases</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/article-table" activeclassname="active">
              <FeedIcon className="icon" />
              <span>Articles</span>
            </NavLink>
          </li>
          {userRole === "admin" && (
            <li>
              <NavLink to="/appointment-table" activeclassname="active">
                <TodayIcon className="icon" />
                <span>Appointments</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/blog-table" activeclassname="active">
              <NewspaperIcon className="icon" />
              <span>Blogs</span>
            </NavLink>
          </li>
          {userRole === "admin" && (
            <li>
              <NavLink to="/user-table" activeclassname="active">
                <PeopleIcon className="icon" />
                <span>Accounts</span>
              </NavLink>
            </li>
          )}
          <hr />
          <li className="mt-auto">
            <NavLink to="">
              <SettingsApplicationsIcon className="icon" />
              <span>Setting</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="" onClick={handleSignOut}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
