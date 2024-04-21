import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";
import DiseaseDatatable from "../../components/diseasetable/DiseaseTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DiseaseDatatable />
      </div>
    </div>
  );
};

export default List;
