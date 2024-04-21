import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";
import AppointmentDatatable from "../../components/appttable/ApptTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <AppointmentDatatable />
      </div>
    </div>
  );
};

export default List;
