import Footer from "../../components/ForPages/Footer";
import HeartSVG from "../../assets/home/heartSVG.svg";
import DentistSVG from "../../assets/home/dentistSVG.svg";
import LungSVG from "../../assets/home/lungSVG.svg";
import EyesSVG from "../../assets/home/eyesSVG.svg";
import BoneSVG from "../../assets/home/boneSVG.svg";
import EarSVG from "../../assets/home/earSVG.svg";
import DnaSVG from "../../assets/home/dnaSVG.svg";
import TubeSVG from "../../assets/home/tubesSVG.svg";
import { Link } from "react-router-dom";

const SpecialtyPage = () => {
  return (
    <>
      <div className="specialty-list w-100">
        <div className="content-container">
          <h1>Chuyên khoa</h1>
          <div className="specialty-list-wrapper">
            <div className="specialty-item">
              <img src={HeartSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Tim mạch</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/tim-mach">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={BoneSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Cơ - xương - khớp</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/co-xuong-khop">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={LungSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Nội tổng hợp</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/noi-tong-hop">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={DentistSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Răng - hàm - mặt</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/rang-ham-mat">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={EyesSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Mắt</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/mat">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={TubeSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Xét nghiệm</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/xet-nghiem">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={EarSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Tai - mũi - họng</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/tai-mui-hong">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={DnaSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Thần kinh</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y
                    học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều
                    trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan
                    quan trọng giúp duy trì sự sống của con người.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/than-kinh">Xem chi tiết</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialtyPage;
