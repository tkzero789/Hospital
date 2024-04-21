import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/adminNav/AdminNav";
import ArticleDatatable from "../../components/articletable/ArticleTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ArticleDatatable />
      </div>
    </div>
  );
};

export default List;
