import Sidebar from "components/Navbar/Sidebar/Sidebar";
import Navbar from "components/Navbar/AdminNav/AdminNav";
import "pages/Layout/Layout.scss";

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
