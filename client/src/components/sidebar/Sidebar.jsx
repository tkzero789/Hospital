import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import GridViewIcon from "@mui/icons-material/GridView";
import FeedIcon from "@mui/icons-material/Feed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./sidebar.scss";
import BKCLogo from "../../assets/logo/footerLogo2.svg";
import { useAuth } from "../../AuthContext";

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
      console.log(response);
      logout();
      navigate("/test-signin");
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
            <img src={BKCLogo} alt="" />
          </div>
        </NavLink>
      </div>

      <div className="center">
        <ul>
          <NavLink to="/dashboard">
            <li>
              <GridViewIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <NavLink to="/symptom-table">
            <li>
              <FeedIcon className="icon" />
              <span>Danh sách triệu chứng</span>
            </li>
          </NavLink>
          <NavLink to="/disease-table">
            <li>
              <FeedIcon className="icon" />
              <span>Danh sách căn bệnh</span>
            </li>
          </NavLink>
          <NavLink to="/article-table">
            <li>
              <FeedIcon className="icon" />
              <span>Danh sách bài viết</span>
            </li>
          </NavLink>
          {userRole === "admin" && (
            <NavLink to="/appointment-table">
              <li>
                <FeedIcon className="icon" />
                <span>Danh sách đặt hẹn</span>
              </li>
            </NavLink>
          )}
          {userRole === "admin" && (
            <NavLink to="/user-table">
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
}
