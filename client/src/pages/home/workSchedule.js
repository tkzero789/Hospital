import Footer from "../../components/Home/Footer";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const WorkSchedule = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Lịch làm việc</title>
        </Helmet>
      </HelmetProvider>
      <div className="content-container">
        <Breadcrumbs
          className="breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link className="text-secondary" to="/home">
            Trang chủ
          </Link>
          ,<Typography className="text-dark">Lịch làm việc</Typography>,
        </Breadcrumbs>
      </div>
      <div className="work">
        <div className="content-container">
          <div className="work-wrapper">
            <h1>Lịch làm việc tại bệnh viện đa khoa BKCare</h1>
            <h2>Dịch vụ cấp cứu 24/7</h2>
            <ul>
              <li>
                Khách hàng có nhu cầu dịch vụ cấp cứu, vận chuyển cấp cứu, khám
                nội đa khoa được phục vụ 24 giờ.
              </li>
              <li>
                Hệ thống phòng mổ, chẩn đoán hình ảnh và xét nghiệm hoạt động 24
                giờ để phục vụ nhu cầu cấp cứu.
              </li>
            </ul>
            <h2>Giờ làm việc của các phòng khám</h2>
            <p>Từ thứ Hai đến thứ Sáu</p>
            <ul>
              <li>Sáng: 7:30 - 12:00</li>
              <li>Chiều: 13:30 - 17:00</li>
            </ul>
            <p>Thứ Bảy và Chủ Nhật</p>
            <ul>
              <li>Sáng: 7:30 - 11:30</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkSchedule;
