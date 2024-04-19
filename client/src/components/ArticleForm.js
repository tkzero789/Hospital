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
    console.log(finalInfoNumber);
    setArticle((prevArticle) => ({
      ...prevArticle,
      infos: [
        ...prevArticle.infos,
        {
          id: uuidv4(),
          number: finalInfoNumber,
          detail: "",
          image: null,
        },
      ],
    }));
    setFinalInfoNumber(finalInfoNumber + 1);
  };

  const updateInfoField = (infoNo, event) => {
    let _article = { ...article };
    _article.infos[infoNo - 1][event.target.name] = event.target.value;
    setArticle(_article);
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
    console.log(response.data.link);
    let _article = { ...article };
    _article.infos[infoNo - 1][event.target.name] = response.data.link;
    setArticle(_article);
  };

  const deleteInfoField = (infoNo) => {
    let _article = { ...article };
    _article.infos = _article.infos.filter((info) => info.number !== infoNo);
    _article.infos = _article.infos.map((info) => ({
      ...info,
      number: info.number > infoNo ? info.number - 1 : info.number,
    }));
    setFinalInfoNumber(finalInfoNumber - 1);
    setArticle(_article);
  };

  const addTreatmentField = () => {
    let _article = { ...article };
    _article.treatments.push({
      index: uuidv4(),
      number: finalTreatmentNumber,
      detail: "",
      image: null,
    });
    setFinalTreatmentNumber(finalTreatmentNumber + 1);
    setArticle(_article);
  };

  const updateTreatmentField = (treatmentNo, event) => {
    let _article = { ...article };
    _article.treatments[treatmentNo - 1][event.target.name] =
      event.target.value;
    setArticle(_article);
  };

  const updateTreatmentImage = async (treatmentNo, event) => {
    const formData = new FormData();
    console.log(formData);
    formData.append("image", event.target.files[0]);
    console.log(formData);
    const response = await axios.post(
      `http://localhost:5000/article/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    let _article = { ...article };
    _article.treatments[treatmentNo - 1][event.target.name] =
      response.data.link;
    console.log(_article);
    setArticle(_article);
  };

  const deleteTreatmentField = (treatmentNo) => {
    let _article = { ...article };
    _article.treatments = _article.treatments.filter(
      (treatment) => treatment.number !== treatmentNo
    );
    _article.treatments = _article.treatments.map((treatment) => ({
      ...treatment,
      number:
        treatment.number > treatmentNo
          ? treatment.number - 1
          : treatment.number,
    }));
    setFinalTreatmentNumber(finalTreatmentNumber - 1);
    setArticle(_article);
  };

  const updateTitleField = (event) => {
    let _article = { ...article };
    _article[event.target.name] = event.target.value;
    setArticle(_article);
  };

  return (
    <div>
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
                  {info.image === null ? (
                    editMode && (
                      <input
                        type="file"
                        name="image"
                        className="form-control border-primary-subtle col-9"
                        placeholder="Ảnh minh họa"
                        onChange={(e) => updateInfoImage(info.number, e)}
                      />
                    )
                  ) : (
                    <img
                      alt={info.image}
                      src={info.image}
                      className="form-control border-primary-subtle col-9"
                    />
                  )}
                  <textarea
                    name="detail"
                    value={info.detail}
                    readOnly={!editMode}
                    className="form-control border-primary-subtle col-9"
                    placeholder="Thông tin"
                    rows="4"
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
                  {treatment.image === null ? (
                    editMode && (
                      <input
                        type="file"
                        name="image"
                        className="form-control border-primary-subtle col-9"
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
                      className="form-control border-primary-subtle col-9"
                    />
                  )}
                  <textarea
                    name="detail"
                    value={treatment.detail}
                    readOnly={!editMode}
                    className="form-control border-primary-subtle col-9"
                    placeholder="Thông tin"
                    rows="4"
                    onChange={(e) => updateTreatmentField(treatment.number, e)}
                  />
                </div>
              </div>
            );
          })}
          {editMode && (
            <div
              onClick={addTreatmentField}
              className="btn btn-outline-primary"
            >
              <h4 className="text-blue-2">THÊM PHƯƠNG PHÁP CHỮA TRỊ</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
