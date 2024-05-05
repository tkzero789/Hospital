import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "./adminnav.scss";
import { useAuth } from "../../AuthContext";

const AdminNav = () => {
  const { getUserInfos } = useAuth();
  const userInfos = getUserInfos();
  const fullName = userInfos ? userInfos.fullName : null;

  return (
    <div className="admin-navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />

            <div className="counter">!</div>

            <div className="noti-list">
              <ul>
                <li>Một bài viết mới đã được tạo bởi</li>
                <li>Một bài viết mới đã được tạo bởi</li>
                <li>Một bài viết mới đã được tạo bởi</li>
              </ul>
            </div>
          </div>
          <div className="item">
            <span>{fullName}</span>
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
