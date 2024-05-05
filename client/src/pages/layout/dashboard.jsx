import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import "./dashboard.scss";

export default function Dashboard({ userRole }) {
  return (
    <div className="home">
      <Sidebar userRole={userRole} />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
}
