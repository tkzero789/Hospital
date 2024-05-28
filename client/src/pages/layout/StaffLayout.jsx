import "./list.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/AdminNav";

export default function NavbarLayout({ title, children }) {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
