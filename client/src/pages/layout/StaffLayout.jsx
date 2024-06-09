import "pages/layout/layout.scss";
import Sidebar from "components/Navbar/Sidebar/Sidebar";
import Navbar from "components/Navbar/AdminNav/AdminNav";

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
