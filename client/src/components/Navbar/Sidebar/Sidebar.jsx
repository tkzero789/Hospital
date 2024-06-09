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
import BaySideLogo from "assets/logo/BaySide-logo-2.svg";
import { useAuth } from "AuthContext";
import "components/Navbar/Sidebar/sidebar.scss";

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
      const message = `Có lỗi xảy ra: ${err}`;
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
          <NavLink to="/symptom-table" activeclassname="active">
            <li>
              <MonitorHeartIcon className="icon" />
              <span>Symptoms</span>
            </li>
          </NavLink>
          <NavLink to="/disease-table" activeclassname="active">
            <li>
              <MedicalServicesIcon className="icon" />
              <span>Diseases</span>
            </li>
          </NavLink>
          <NavLink to="/article-table" activeclassname="active">
            <li>
              <FeedIcon className="icon" />
              <span>Articles</span>
            </li>
          </NavLink>
          {userRole === "admin" && (
            <NavLink to="/appointment-table" activeclassname="active">
              <li>
                <TodayIcon className="icon" />
                <span>Appointments</span>
              </li>
            </NavLink>
          )}
          {userRole === "admin" && (
            <NavLink to="/user-table" activeclassname="active">
              <li>
                <PeopleIcon className="icon" />
                <span>Accounts</span>
              </li>
            </NavLink>
          )}
          <NavLink to="/blog-table" activeclassname="active">
            <li>
              <NewspaperIcon className="icon" />
              <span>Blogs</span>
            </li>
          </NavLink>
          <NavLink to="">
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Setting</span>
            </li>
          </NavLink>
          <NavLink to="" onClick={handleSignOut}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
