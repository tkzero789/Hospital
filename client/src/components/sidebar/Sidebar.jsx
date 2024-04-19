import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink } from "react-router-dom";
import BKCLogo from "../../assets/logo/footerLogo2.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink
          className="logo-link"
          to="/admin-home"
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

          <NavLink to="/users">
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Bác sĩ</span>
            </li>
          </NavLink>
          <NavLink to="/articles">
            <li>
              <ArticleIcon className="icon" />
              <span>Bài viết</span>
            </li>
          </NavLink>

          <NavLink>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Cài đặt</span>
            </li>
          </NavLink>
          <NavLink to="/home">
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
