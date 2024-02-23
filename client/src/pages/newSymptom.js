import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

import AdminNavBar from "../components/AdminNavBar";

export default function NewSymptom() {
  const [symptom, setSymtom] = useState({
    symptomName: "",
    categories: [
      {
        index: uuidv4(),
        categoryName: "",
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
      name: "",
      descriptions: [
        {
          index: uuidv4(),
          name: "",
        },
      ],
    });
    setSymtom(_symptom);
  };

  const addDescriptionField = (categoryId, id) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.index === categoryId
    );
    _symptom.categories[categoryIndex].descriptions.push({
      index: uuidv4(),
      name: "",
    });
    setSymtom(_symptom);
  };

  const updateNameField = (value) => {
    return setSymtom((prev) => {
      return { ...prev, ...value };
    });
  };

  const updateCategoriesField = (categoryId, event) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.index === categoryId
    );
    _symptom.categories[categoryIndex][event.target.name] = event.target.value;
    setSymtom(_symptom);
  };

  const updateDescriptionsField = (categoryId, descriptionId, event) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.index === categoryId
    );

    const descriptionIndex = symptom.categories[
      categoryIndex
    ].descriptions.findIndex((description) => description.id === descriptionId);

    _symptom.categories[categoryIndex].descriptions[descriptionIndex][
      event.target.name
    ] = event.target.value;

    setSymtom(_symptom);
  };

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const newSymptom = { ...symptom };

    await fetch("http://localhost:5000/symptom/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSymptom),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    console.log("Created");

    setSymtom({
      symptomName: "",
      categories: [
        {
          index: uuidv4(),
          categoryName: "",
          descriptions: [
            {
              index: uuidv4(),
              descriptionDetail: "",
            },
          ],
        },
      ],
    });
    navigate("/new-symptom");
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
              id="name"
              value={symptom.name}
              onChange={(e) => updateNameField({ name: e.target.value })}
            />
          </div>
          <h4 className="card-title text-danger pb-3">THÊM MÔ TẢ CHI TIẾT</h4>
          {symptom.categories.map((category) => {
            return (
              <div key={category.index}>
                <div className="form-group row pb-3">
                  <i style={{ color: "red" }} class="bi bi-plus-square"></i>
                  <h5 className="text-danger col-2">THUỘC TÍNH</h5>
                  <select
                    name="categoryName"
                    className="form-select border-danger-subtle col"
                    onChange={(e) => updateCategoriesField(category.index, e)}
                  >
                    <option value="Vị trí">Vị trí</option>
                    <option value="Mức độ">Mức độ</option>
                    <option value="Liều lượn">Liều lượng</option>
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
                    <div className="form-group pb-3 col-6">
                      <input
                        name="descriptionDetail"
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

          <div className="row pt-3 pb-3 justify-content-center">
            <div className="col-3 d-grid gap-2">
              <button className="btn btn-danger" onClick={onSubmit}>
                XÁC NHẬN VÀ TẠO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
