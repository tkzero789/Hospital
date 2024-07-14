import { useLocation } from "react-router-dom";
import Sidebar from "components/Navbar/Sidebar/Sidebar";
import Navbar from "components/Navbar/AdminNav/AdminNav";
import "pages/Layout/Layout.scss";

export default function NavbarLayout({ title, children }) {
  const location = useLocation();
  const path = location.pathname;

  // Regular expression to match dynamic path
  const diseasePathRegex = /^\/disease\/[^/]+\/article-table$/;
  const viewBlogPathRegex = /^\/blog\/[^/]+\/view$/;

  // Determine if the current path is "/appointment-table" or "/symptom-table"
  const Background = !(
    path === "/symptom-table" ||
    path === "/disease-table" ||
    path === "/article-table" ||
    path === "/appointment-table" ||
    path === "/blog-table" ||
    path === "/user-table" ||
    diseasePathRegex.test(path) ||
    viewBlogPathRegex.test(path)
  );
  return (
    <div className="list">
      <Sidebar />
      <div className={`listContainer ${Background ? "bg-gray-1" : ""}`}>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
