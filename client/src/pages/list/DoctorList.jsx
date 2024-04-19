import "./doctorlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";
import DortorDatatable from "../../components/doctortable/DoctorTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DortorDatatable />
      </div>
    </div>
  );
};

export default List;
