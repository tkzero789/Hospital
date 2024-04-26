import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function EditSymptom() {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [symptom, setSymptom] = useState({
    id: "",
    symptomName: "",
    categories: [
      {
        id: "",
        categoryName: "Vị trí",
        descriptions: [
          {
            id: "",
            descriptionDetail: "",
          },
        ],
      },
    ],
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
  });
  const { symptomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/${symptomId}`)
      .then((res) => {
        const dbsymptom = res.data;
        if (!dbsymptom) {
          const id = symptomId;
          window.alert(`Symptom with id ${id} not found`);
          navigate("/create-symptom");
          return;
        }
        setSymptom({
          ...dbsymptom,
          createInfos: {
            ...dbsymptom.createInfos,
            timeEdited: formattedDate,
          },
        });
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  const addCategoryField = () => {
    let _symptom = { ...symptom };
    _symptom.categories.push({
      id: uuidv4(),
      categoryName: "Vị trí",
      descriptions: [
        {
          id: uuidv4(),
          descriptionDetail: "",
        },
      ],
    });
    setSymptom(_symptom);
  };

  const addDescriptionField = (categoryId) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.id === categoryId
    );
    _symptom.categories[categoryIndex].descriptions.push({
      id: uuidv4(),
      descriptionDetail: "",
    });
    setSymptom(_symptom);
  };

  const updateNameField = (event) => {
    let _symptom = { ...symptom };
    _symptom[event.target.name] = event.target.value;
    return setSymptom(_symptom);
  };

  const updateCategoryField = (categoryId, event) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.id === categoryId
    );

    _symptom.categories[categoryIndex][event.target.name] = event.target.value;
    setSymptom(_symptom);
  };

  const updateDescriptionsField = (categoryId, descriptionId, event) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.id === categoryId
    );

    const descriptionIndex = symptom.categories[
      categoryIndex
    ].descriptions.findIndex((description) => description.id === descriptionId);

    _symptom.categories[categoryIndex].descriptions[descriptionIndex][
      event.target.name
    ] = event.target.value;

    setSymptom(_symptom);
  };

  const deleteCategoriesField = (categoryId) => {
    let _symptom = { ...symptom };
    _symptom.categories = _symptom.categories.filter(
      (category) => category.id !== categoryId
    );
    console.log(_symptom.categories);
    setSymptom(_symptom);
  };

  const deleteDescriptionsField = (categoryId, descriptionId) => {
    let _symptom = { ...symptom };
    const categoryIndex = symptom.categories.findIndex(
      (category) => category.id === categoryId
    );
    _symptom.categories[categoryIndex].descriptions = _symptom.categories[
      categoryIndex
    ].descriptions.filter((description) => description.id !== descriptionId);
    setSymptom(_symptom);
  };

  async function onSubmit(e) {
    e.preventDefault();
    const editedSymptom = { ...symptom };
    axios
      .post(`http://localhost:5000/symptom/update/${symptomId}`, editedSymptom)
      .then((res) => {
        console.log("Symptom edited");
        console.log("res");
        navigate("/symptom-table");
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        TẠO TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-secondary-subtle p-5">
          <div className="form-group row pb-5">
            <h4 className="card-title text-body col-3">Tên triệu chứng:</h4>
            <input
              type="text"
              className="form-control border-secondary-subtle col"
              name="name"
              value={symptom.name}
              onChange={(e) => updateNameField(e)}
            />
          </div>
          <h4 className="card-title text-body">Chỉnh sửa mô tả chi tiết:</h4>
          {symptom.categories.map((category) => {
            return (
              <div key={category.id}>
                <div className="form row pb-3 mt-5">
                  <div className="col-2" style={{ display: "flex" }}>
                    <i
                      class="btn py-0 px-0 bi bi-file-minus"
                      style={{ color: "#000", marginRight: "5px" }}
                      onClick={(e) => deleteCategoriesField(category.id)}
                    ></i>
                    <h5 className="text-body">Thuộc tính:</h5>
                  </div>
                  <select
                    name="categoryName"
                    value={category.categoryName}
                    className="form-select border-secondary-subtle col"
                    onChange={(e) => updateCategoryField(category.id, e)}
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
                          deleteDescriptionsField(category.id, description.id)
                        }
                      ></i>
                      <input
                        name="descriptionDetail"
                        value={description.descriptionDetail}
                        type="text"
                        className="form-control border-secondary-subtle "
                        placeholder="Mô tả"
                        onChange={(e) =>
                          updateDescriptionsField(
                            category.id,
                            description.id,
                            e
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="row justify-content-center">
                  <div className="col-1 rounded-5 btn btn-light border-secondary-subtle border-0 py-0 px-0">
                    <div onClick={() => addDescriptionField(category.id)}>
                      <i class="text-secondary fs-3 bi bi-plus-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            onClick={addCategoryField}
            className="btn btn-secondary bg-gradient mt-5"
          >
            Thêm thuộc tính
          </div>
          <div className="row pt-3 justify-content-end">
            <div className="col-3 d-grid gap-2">
              <NavLink
                className="btn btn-outline-primary"
                to={`/symptom/${symptomId}/view`}
              >
                TRỞ VỀ CHẾ ĐỘ XEM
              </NavLink>
            </div>
            <div className="col-3 d-grid gap-2">
              <button className="btn btn-outline-primary" onClick={onSubmit}>
                XÁC NHẬN CHỈNH SỬA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
