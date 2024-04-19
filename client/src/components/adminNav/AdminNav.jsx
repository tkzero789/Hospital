import "./adminnav.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const AdminNav = () => {
  return (
    <div className="admin-navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Tìm kiếm..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">4</div>
          </div>
          <div className="item">
            <span>Bác sĩ</span>
            <img
              src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
