import SymptomWidget from "components/Widget/SymptomWidget";
import DiseaseWidget from "components/Widget/DiseaseWidget";
import ArticleWidget from "components/Widget/ArticleWidget";
import BlogWidget from "components/Widget/BlogWidget";
import ApptChartWidget from "components/Widget/ApptChartWidget";
import UserWidget from "components/Widget/UserWidget";
import AppointmentWidget from "components/Widget/AppointmentWidget";
import BlogListWidget from "components/Widget/BlogListWidget";
import "pages/Dashboard/Dashboard.scss";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard__wrapper">
          <div className="top">
            <div className="top__wrapper">
              <SymptomWidget />
              <DiseaseWidget />
              <ArticleWidget />
              <AppointmentWidget />
              <BlogWidget />
              <UserWidget />
            </div>
          </div>
          <div className="middle">
            <div className="middle__wrapper">
              <ApptChartWidget />
            </div>
          </div>
          <div className="bottom">
            <div className="bottom__wrapper">
              <BlogListWidget />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
