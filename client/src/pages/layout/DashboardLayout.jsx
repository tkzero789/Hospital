import "./dashboard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";

export default function NavbarLayout({ title, children }) {
  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
