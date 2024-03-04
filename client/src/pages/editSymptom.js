import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import AdminNavBar from "../components/AdminNavBar";

export default function EditSymptom() {
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
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-backend.onrender.com/symptom/${params.id.toString()}`
      )
      .then((res) => {
        const dbsymptom = res.data;
        if (!dbsymptom) {
          const id = params.id.toString();
          window.alert(`Symptom with id ${id} not found`);
          navigate("/create-symptom");
          return;
        }
        setSymptom(dbsymptom);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [params.id, navigate]);

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

  async function onSubmit(e) {
    e.preventDefault();
    const editedSymptom = { ...symptom };
    axios
      .post(
        `https://symptom-checker-with-mern-backend.onrender.com/symptom/update/${params.id}`,
        editedSymptom
      )
      .then((res) => {
        console.log("Symptom edited");
        console.log("res");
        navigate("/create-symptom");
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <AdminNavBar />
      <h3 className="container text-center text-danger pt-5">
        TẠO TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-danger-subtle p-5">
          <div className="form-group row pb-5">
            <h4 className="card-title text-danger col-3">TÊN TRIỆU CHỨNG</h4>
            <input
              type="text"
              className="form-control border-danger-subtle col"
              name="name"
              value={symptom.name}
              onChange={(e) => updateNameField(e)}
            />
          </div>
          <h4 className="card-title text-danger pb-3">THÊM MÔ TẢ CHI TIẾT</h4>
          {symptom.categories.map((category) => {
            return (
              <div key={category.index}>
                <div className="form row pb-3">
                  <div className="col-2" style={{ display: "flex" }}>
                    <i
                      class="bi bi-file-minus"
                      style={{ color: "red", marginRight: "5px" }}
                      onClick={(e) => deleteCategoriesField(category.index)}
                    ></i>
                    <h5 className="text-danger">THUỘC TÍNH</h5>
                  </div>
                  <select
                    name="categoryName"
                    value={category.categoryName}
                    className="form-select border-danger-subtle col"
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
                      className="form-group pb-3 col-6"
                      style={{ display: "flex" }}
                    >
                      <i
                        class="bi bi-file-minus"
                        style={{ color: "red", marginRight: "5px" }}
                        onClick={(e) =>
                          deleteDescriptionsField(
                            category.index,
                            description.index
                          )
                        }
                      ></i>
                      <input
                        name="descriptionDetail"
                        value={description.descriptionDetail}
                        type="text"
                        className="form-control border-danger-subtle "
                        placeholder="Mô tả"
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
                  <div className="pb-3 col-6">
                    <div
                      onClick={() => addDescriptionField(category.index)}
                      className="btn btn-outline-danger p-1 col-12"
                    >
                      <h5 className="text-danger">THÊM MÔ TẢ</h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div onClick={addCategoriesField} className="btn btn-outline-danger">
            <h5 className="text-danger">THÊM THUỘC TÍNH</h5>
          </div>
          <div className="row pt-5 pb-3 justify-content-center">
            <div className="col-3 d-grid gap-2">
              <button className="btn btn-danger" onClick={onSubmit}>
                XÁC NHẬN CHỈNH SỬA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
