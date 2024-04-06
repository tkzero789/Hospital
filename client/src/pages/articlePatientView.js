import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MainNav from "../components/Navbar/MainNav";
import LowNav from "../components/Navbar/LowNav";
import Footer from "../components/ForPages/Footer";

export default function ArticlePatientView() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-backend.onrender.com/article/${params.id.toString()}`
      )
      .then((res) => {
        const article = res.data;
        if (!article) {
          const id = params.id.toString();
          window.alert(`Article with id ${id} not found`);
          navigate("/symptom-checker");
          return;
        }
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [params.id]);

  const ArticleInfo = (props) => {
    const infoDetail = props.info.detail;
    const detailType = infoDetail.split("\n\n")[0];
    const detailContent = infoDetail.split("\n\n")[1];
    const detailContentRows = detailContent.split("\n");
    return (
      <div>
        <p>{detailType}</p>
        {detailContentRows.map((row, index) => (
          <p key={index}>{row}</p>
        ))}
      </div>
    );
  };

  const ArticleTreatment = (props) => {
    const treatmentDetail = props.treatment.detail;
    const detailType = treatmentDetail.split("\n\n")[0];
    const detailContent = treatmentDetail.split("\n\n")[1];
    const detailContentRows = detailContent.split("\n");
    return (
      <div>
        <p>{detailType}</p>
        {detailContentRows.map((row, index) => (
          <p key={index}>{row}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <MainNav />
      <LowNav />
      {/* Symptom Checker Section */}
      <div className="symp-checker w-100">
        {isLoading ? (
          <p>Đang tải bài viết...</p>
        ) : (
          <div className="content-container">
            <h3 className="text-center">{article.title}</h3>
            <div className="symp-checker-steps">
              <h5>THÔNG TIN CĂN BỆNH</h5>
              {article.diseaseInfos.map((info) => (
                <ArticleInfo info={info} key={info.index} />
              ))}
              <h5>PHƯƠNG PHÁP ĐIỀU TRỊ</h5>
              {article.diseaseTreatments.map((treatment) => (
                <ArticleTreatment treatment={treatment} key={treatment.index} />
              ))}
              <hr></hr>
              <p className="d-flex justify-content-end">
                Bài viết được cung cấp bởi {article.author}
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
