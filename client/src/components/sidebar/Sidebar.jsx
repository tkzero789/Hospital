import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArticleIcon from "@mui/icons-material/Article";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink, useNavigate } from "react-router-dom";
import BKCLogo from "../../assets/logo/footerLogo2.svg";
import { useAuth } from "../../AuthContext";
import axios from "axios";

const Sidebar = () => {
  const { logout, getUserRole } = useAuth();
  const userRole = getUserRole();
  const isDoctor = userRole === "head-doctor" || userRole === "doctor";
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
      console.log(response);
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
          to="/home"
          style={{ textDecoration: "none" }}
        >
          <div className="admin-logo">
            <img src={BKCLogo} alt="" />
          </div>
        </NavLink>
      </div>

      <div className="center">
        <ul>
          <NavLink to="/admin-home">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <NavLink to="/article-list-table">
            <li>
              <ArticleIcon className="icon" />
              <span>Danh sách bài viết</span>
            </li>
          </NavLink>
          <NavLink to="/disease-list-table">
            <li>
              <HeartBrokenIcon className="icon" />
              <span>Danh sách căn bệnh</span>
            </li>
          </NavLink>
          {!isDoctor && (
            <NavLink to="/appointment-list-table">
              <li>
                <CalendarMonthIcon className="icon" />
                <span>Danh sách đặt hẹn</span>
              </li>
            </NavLink>
          )}
          {!isDoctor && (
            <NavLink to="/user-list-table">
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Danh sách users</span>
              </li>
            </NavLink>
          )}
          <NavLink>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Cài đặt</span>
            </li>
          </NavLink>
          <NavLink onClick={handleSignOut}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
