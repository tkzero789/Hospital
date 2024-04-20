import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";
import UserDatatable from "../../components/usertable/UserTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <UserDatatable />
      </div>
    </div>
  );
};

export default List;
