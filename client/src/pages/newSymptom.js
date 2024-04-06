import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import AdminNavBar from "../components/Navbar/AdminNavBar";

export default function NewSymptom() {
  const [symptom, setSymptom] = useState({
    symptomName: "",
    categories: [
      {
        index: uuidv4(),
        categoryName: "Vị trí",
        descriptions: [
          {
            index: uuidv4(),
            descriptionDetail: "",
          },
        ],
      },
    ],
  });

  const addCategoriesField = (id) => {
    let _symptom = { ...symptom };
    _symptom.categories.push({
      index: uuidv4(),
      categoryName: "Vị trí",
      descriptions: [
        {
          index: uuidv4(),
          descriptionDetail: "",
        },
      ],
    });
    setSymptom(_symptom);
  };

  const addDescriptionField = (categoryId, id) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.index === categoryId
    );
    _symptom.categories[categoryIndex].descriptions.push({
      index: uuidv4(),
      descriptionDetail: "",
    });
    setSymptom(_symptom);
  };

  const updateNameField = (event) => {
    let _symptom = { ...symptom };
    _symptom[event.target.name] = event.target.value;
    return setSymptom(_symptom);
  };

  const updateCategoriesField = (categoryId, event) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.index === categoryId
    );
    _symptom.categories[categoryIndex][event.target.name] = event.target.value;
    setSymptom(_symptom);
  };

  const updateDescriptionsField = (categoryId, descriptionId, event) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.index === categoryId
    );
    const descriptionIndex = symptom.categories[
      categoryIndex
    ].descriptions.findIndex(
      (description) => description.index === descriptionId
    );
    _symptom.categories[categoryIndex].descriptions[descriptionIndex][
      event.target.name
    ] = event.target.value;
    setSymptom(_symptom);
  };

  const deleteCategoriesField = (categoryId) => {
    let _symptom = { ...symptom };
    _symptom.categories = _symptom.categories.filter(
      (category) => category.index !== categoryId
    );
    console.log(_symptom.categories);
    setSymptom(_symptom);
  };

  const deleteDescriptionsField = (categoryId, descriptionId) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.index === categoryId
    );
    _symptom.categories[categoryIndex].descriptions = _symptom.categories[
      categoryIndex
    ].descriptions.filter((description) => description.index !== descriptionId);
    setSymptom(_symptom);
  };

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const newSymptom = { ...symptom };
    axios
      .post(
        "https://symptom-checker-with-mern-backend.onrender.com/symptom/add",
        newSymptom
      )
      .then((res) => {
        console.log("Symptom created");
        console.log(res.data);
        setSymptom({
          symptomName: "",
          categories: [
            {
              index: uuidv4(),
              categoryName: "Vị trí",
              descriptions: [
                {
                  index: uuidv4(),
                  descriptionDetail: "",
                },
              ],
            },
          ],
        });
        navigate("/create-symptom");
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }

  return (
    <div>
      <AdminNavBar />
      <h3 className="container text-center text-body pt-5">
        TẠO TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-primary p-5">
          <div className="form-group row pb-5">
            <h4 className="card-title text-body col-3">Tên triệu chứng:</h4>
            <input
              type="text"
              className="form-control border-primary col border-dark-subtle shadow-sm"
              name="symptomName"
              placeholder="Nhập tên triệu chứng"
              onChange={(e) => updateNameField(e)}
            />
          </div>
          <h4 className="card-title text-body">Thêm mô tả chi tiết:</h4>
          {symptom.categories.map((category) => {
            return (
              <div key={category.index}>
                <div className="form row pb-3 mt-5">
                  <div className="col-2" style={{ display: "flex" }}>
                    <i
                      class="btn py-0 px-0 bi bi-file-minus"
                      style={{ color: "#000", marginRight: "5px" }}
                      onClick={(e) => deleteCategoriesField(category.index)}
                    ></i>
                    <h5 className="text-body">Thuộc tính:</h5>
                  </div>
                  <select
                    name="categoryName"
                    className="form-select border-secondary col"
                    onChange={(e) => updateCategoriesField(category.index, e)}
                  >
                    <option value="Vị trí">Vị trí</option>
                    <option value="Mức độ">Mức độ</option>
                    <option value="Liều lượng">Liều lượng</option>
                    <option value="Thời gian">Thời gian</option>
                    <option value="Khởi phát">Khởi phát</option>
                    <option value="Yếu tố làm tăng/giảm">
                      Yếu tố làm tăng/giảm
                    </option>
                    <option value="Dấu hiệu kèm theo">Dấu hiệu kèm theo</option>
                  </select>
                </div>

                <div className="row">
                  {category.descriptions.map((description) => (
                    <div
                      className="form-group pb-3 col-12"
                      style={{ display: "flex" }}
                    >
                      <i
                        class="btn py-0 px-0 bi bi-file-minus"
                        style={{ color: "#000", marginRight: "5px" }}
                        onClick={(e) =>
                          deleteDescriptionsField(
                            category.index,
                            description.index
                          )
                        }
                      ></i>
                      <input
                        name="descriptionDetail"
                        type="text"
                        className="form-control border border-dark-subtle shadow-sm rounded "
                        placeholder="Nhập mô tả"
                        onChange={(e) =>
                          updateDescriptionsField(
                            category.index,
                            description.index,
                            e
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="row justify-content-center">
                  <div className="col-1 rounded-5 btn btn-light border-secondary-subtle border-0 py-0 px-0">
                    <div onClick={() => addDescriptionField(category.index)}>
                      <i class="text-secondary fs-3 bi bi-plus-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            onClick={addCategoriesField}
            className="btn btn-secondary bg-gradient mt-5"
          >
            Thêm thuộc tính
          </div>

          <div className="row pt-3 justify-content-center">
            <div className="col-3 d-grid gap-2">
              <button
                className="btn btn-primary bg-gradient"
                onClick={onSubmit}
              >
                XÁC NHẬN VÀ TẠO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
