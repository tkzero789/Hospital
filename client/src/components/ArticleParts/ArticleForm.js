import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ArticleForm = ({ article, setArticle, editMode }) => {
  const [finalInfoNumber, setFinalInfoNumber] = useState(1);
  const [finalTreatmentNumber, setFinalTreatmentNumber] = useState(
    article.treatments.length + 1
  );

  useEffect(() => {
    setFinalInfoNumber(article.infos.length + 1);
    setFinalTreatmentNumber(article.treatments.length + 1);
  }, [article]);

  const addInfoField = () => {
    setArticle({
      ...article,
      infos: [
        ...article.infos,
        {
          id: uuidv4(),
          number: finalInfoNumber,
          about: "",
          overview: "",
          detail: "",
          image: null,
        },
      ],
    });
    setFinalInfoNumber(finalInfoNumber + 1);
  };

  const updateInfoField = (infoNo, event) => {
    const infos = article.infos;
    const udpatedInfo = {
      ...infos[infoNo - 1],
      [event.target.name]: event.target.value,
    };
    setArticle({
      ...article,
      infos: [
        ...infos.slice(0, infoNo - 1),
        udpatedInfo,
        ...infos.slice(infoNo),
      ],
    });
  };

  const updateInfoImage = async (infoNo, event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const response = await axios.post(
      `http://localhost:5000/article/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setArticle({
      ...article,
      infos: [
        ...article.infos.slice(0, infoNo - 1),
        {
          ...article.infos[infoNo - 1],
          image: response.data.link,
        },
        ...article.infos.slice(infoNo),
      ],
    });
  };

  const deleteInfoField = (infoNo) => {
    const filterdInfos = article.infos.filter((info) => info.number !== infoNo);
    const updatedInfos = filterdInfos.map((info) => ({
      ...info,
      number: info.number > infoNo ? info.number - 1 : info.number,
    }));
    setArticle({
      ...article,
      infos: updatedInfos,
    });
    setFinalInfoNumber(finalInfoNumber - 1);
  };

  const addTreatmentField = () => {
    setArticle({
      ...article,
      treatments: [
        ...article.treatments,
        {
          id: uuidv4(),
          number: finalTreatmentNumber,
          about: "",
          overview: "",
          detail: "",
          image: null,
        },
      ],
    });
    setFinalTreatmentNumber(finalTreatmentNumber + 1);
  };

  const updateTreatmentField = (treatmentNo, event) => {
    const treatments = article.treatments;
    const udpatedTrm = {
      ...treatments[treatmentNo - 1],
      [event.target.name]: event.target.value,
    };
    setArticle({
      ...article,
      treatments: [
        ...treatments.slice(0, treatmentNo - 1),
        udpatedTrm,
        ...treatments.slice(treatmentNo),
      ],
    });
  };

  const updateTreatmentImage = async (treatmentNo, event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const response = await axios.post(
      `http://localhost:5000/article/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setArticle({
      ...article,
      treatments: [
        ...article.treatments.slice(0, treatmentNo - 1),
        {
          ...article.treatments[treatmentNo - 1],
          image: response.data.link,
        },
        ...article.treatments.slice(treatmentNo),
      ],
    });
  };

  const deleteTreatmentField = (treatmentNo) => {
    const filteredTrms = article.treatments.filter(
      (trm) => trm.number !== treatmentNo
    );
    const updatedTrms = filteredTrms.map((trm) => ({
      ...trm,
      number: trm.number > treatmentNo ? trm.number - 1 : trm.number,
    }));
    setArticle({
      ...article,
      treatments: updatedTrms,
    });
    setFinalTreatmentNumber(finalTreatmentNumber - 1);
  };

  const updateTitleField = (event) => {
    setArticle({ ...article, title: event.target.value });
  };

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">TÊN CĂN BỆNH</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="diseaseName"
          value={article.diseaseName}
          readOnly={true}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">TÊN BÀI VIẾT</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="title"
          value={article.title}
          readOnly={!editMode}
          onChange={(e) => updateTitleField(e)}
        />
      </div>

      <div className="row pb-5">
        {article.infos.map((info) => {
          return (
            <div key={info.id}>
              <div className="form row pb-3">
                <div className="col-12" style={{ display: "flex" }}>
                  {editMode && (
                    <i
                      className="bi bi-file-minus"
                      style={{ color: "blue", marginRight: "5px" }}
                      onClick={(e) => deleteInfoField(info.number)}
                    ></i>
                  )}

                  <h4 className="text-blue-2">THÔNG TIN {info.number}</h4>
                </div>
                <input
                  type="text"
                  className="form-control border-primary-subtle col-9 mb-2"
                  name="about"
                  value={info.about}
                  placeholder="Loại thông tin"
                  readOnly={!editMode}
                  onChange={(e) => updateInfoField(info.number, e)}
                />
                {info.image === null ? (
                  editMode && (
                    <input
                      type="file"
                      name="image"
                      className="form-control border-primary-subtle col-9 mb-2"
                      placeholder="Ảnh minh họa"
                      onChange={(e) => updateInfoImage(info.number, e)}
                    />
                  )
                ) : (
                  <img
                    alt={info.image}
                    src={info.image}
                    className="form-control border-primary-subtle col-9 mb-2"
                  />
                )}
                <textarea
                  name="overview"
                  value={info.overview}
                  readOnly={!editMode}
                  className="form-control border-primary-subtle col-9 mb-2"
                  placeholder="Tổng quan"
                  rows="5"
                  onChange={(e) => updateInfoField(info.number, e)}
                />
                <textarea
                  name="detail"
                  value={info.detail}
                  readOnly={!editMode}
                  className="form-control border-primary-subtle col-9"
                  placeholder="Thông tin chi tiết"
                  rows="10"
                  onChange={(e) => updateInfoField(info.number, e)}
                />
              </div>
            </div>
          );
        })}
        {editMode && (
          <div onClick={addInfoField} className="btn btn-outline-primary">
            <h4 className="text-blue-2">THÊM THÔNG TIN</h4>
          </div>
        )}
      </div>

      <div className="row pb-5">
        {article.treatments.map((treatment) => {
          return (
            <div key={treatment.id}>
              <div className="form row pb-3">
                <div className="col-12" style={{ display: "flex" }}>
                  {editMode && (
                    <i
                      className="bi bi-file-minus"
                      style={{ color: "blue", marginRight: "5px" }}
                      onClick={(e) => deleteTreatmentField(treatment.number)}
                    ></i>
                  )}
                  <h4 className="text-blue-2">
                    PHƯƠNG PHÁP {treatment.number}
                  </h4>
                </div>
                <input
                  type="text"
                  className="form-control border-primary-subtle col-9 mb-2"
                  name="about"
                  value={treatment.about}
                  placeholder="Loại thông tin"
                  readOnly={!editMode}
                  onChange={(e) => updateTreatmentField(treatment.number, e)}
                />
                {treatment.image === null ? (
                  editMode && (
                    <input
                      type="file"
                      name="image"
                      className="form-control border-primary-subtle col-9 mb-2"
                      placeholder="Ảnh minh họa"
                      onChange={(e) =>
                        updateTreatmentImage(treatment.number, e)
                      }
                    />
                  )
                ) : (
                  <img
                    alt={treatment.image}
                    src={treatment.image}
                    className="form-control border-primary-subtle col-9 mb-2"
                  />
                )}
                <textarea
                  name="overview"
                  value={treatment.overview}
                  readOnly={!editMode}
                  className="form-control border-primary-subtle col-9 mb-2"
                  placeholder="Tổng quan"
                  rows="5"
                  onChange={(e) => updateTreatmentField(treatment.number, e)}
                />
                <textarea
                  name="detail"
                  value={treatment.detail}
                  readOnly={!editMode}
                  className="form-control border-primary-subtle col-9"
                  placeholder="Thông tin chi tiết"
                  rows="10"
                  onChange={(e) => updateTreatmentField(treatment.number, e)}
                />
              </div>
            </div>
          );
        })}
        {editMode && (
          <div onClick={addTreatmentField} className="btn btn-outline-primary">
            <h4 className="text-blue-2">THÊM PHƯƠNG PHÁP CHỮA TRỊ</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleForm;