import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import MainNav from "../components/Navbar/MainNav";
import LowNav from "../components/Navbar/LowNav";
import Footer from "../components/ForPages/Footer";

export default function ArticlePatientView({ userInfos }) {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${articleId}`)
      .then((res) => {
        const article = res.data;
        if (!article) {
          window.alert(`Article with id ${articleId} not found`);
          if (!userInfos) {
            navigate("/symptom-checker");
          } else {
            console.log(userInfos);
            navigate(-1);
          }
          return;
        }
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [articleId]);

  const ArticleContent = ({ element }) => {
    const elemDetail = element.detail;
    const detailType = elemDetail.split("\n\n")[0];
    const detailContent = elemDetail.split("\n\n")[1];
    const detailContentRows = detailContent.split("\n");
    return (
      <div>
        <p>{detailType}</p>
        {element.image && console.log(element.image, detailType)}
        {element.image && <img alt={element.image} src={element.image} />}
        {detailContentRows.map((row) => (
          <p key={row.slice(0, 10)}>{row}</p>
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
              {article.infos.map((info) => (
                <ArticleContent element={info} key={info.id} />
              ))}
              <h5>PHƯƠNG PHÁP ĐIỀU TRỊ</h5>
              {article.treatments.map((trm) => (
                <ArticleContent element={trm} key={trm.id} />
              ))}
              <hr></hr>
              <p className="d-flex justify-content-end">
                Bài viết được cung cấp bởi {article.createInfos.doctorCreated}
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
