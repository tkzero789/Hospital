import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";

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
