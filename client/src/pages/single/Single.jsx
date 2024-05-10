import "./single.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";
import List from "../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Chỉnh sửa</div>
            <h1 className="title">Thông tin</h1>
            <div className="item">
              <img
                src="https://www.shareicon.net/data/512x512/2016/08/18/813844_people_512x512.png"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Tên bác sĩ</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">doctor@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">0939-445-647</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Danh sách TEST</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
