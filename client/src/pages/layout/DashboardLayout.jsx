import "./dashboard.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";

export default function NavbarLayout({ children }) {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
