import React from "react";
import { v4 as uuidv4 } from "uuid";

const DiseaseNewSympDes = ({
  disease,
  setDisease,
  chosenSymps,
  chosenCats,
  chosenDes,
  userInfos,
}) => {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const addSymptomField = () => {
    let _symptoms = disease.symptoms;
    _symptoms.push({
      id: uuidv4(),
      name: "",
      categories: [
        {
          id: uuidv4(),
          categoryName: "Vị trí",
          descriptions: [
            {
              id: uuidv4(),
              descriptionDetail: "",
            },
          ],
        },
      ],
      createInfos: {
        doctorCreated: userInfos.fullName,
        doctorID: userInfos.doctorID,
        timeCreated: formattedDate,
        timeEdited: null,
      },
    });
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const updateSymptomField = (symptomId, event) => {
    if (chosenSymps.includes(event.target.value)) {
      window.alert("Triệu chứng đang trùng tên đã có sẵn. Vui lòng chỉnh sửa.");
    }
    let _symptoms = disease.symptoms;
    const symptomIndex = _symptoms.findIndex(
      (symptom) => symptom.id === symptomId
    );

    _symptoms[symptomIndex][event.target.name] = event.target.value;
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const deleteSymptomField = (symptomId) => {
    if (chosenSymps.includes(symptomId)) {
      window.alert(
        "Triệu chứng trùng tên đã có sẵn. Vui lòng chỉnh sửa trước khi xóa."
      );
      return;
    }
    let _symptoms = disease.symptoms.filter(
      (symptom) => symptom.id !== symptomId
    );
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const addCategoryField = (symptomId) => {
    let _symptoms = disease.symptoms;
    const symptomIndex = _symptoms.findIndex(
      (symptom) => symptom.id === symptomId
    );
    _symptoms[symptomIndex].categories.push({
      id: uuidv4(),
      categoryName: "Vị trí",
      descriptions: [
        {
          id: uuidv4(),
          descriptionDetail: "",
        },
      ],
    });
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const updateCategoryField = (symptomId, categoryId, event) => {
    let _symptoms = disease.symptoms;
    const symptomIndex = _symptoms.findIndex(
      (symptom) => symptom.id === symptomId
    );
    const categoryIndex = _symptoms[symptomIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    _symptoms[symptomIndex].categories[categoryIndex][event.target.name] =
      event.target.value;
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const deleteCategoryField = (symptomId, categoryId) => {
    let _symptoms = disease.symptoms;
    const symptomIndex = _symptoms.findIndex(
      (symptom) => symptom.id === symptomId
    );
    _symptoms[symptomIndex].categories = _symptoms[
      symptomIndex
    ].categories.filter((category) => category.id !== categoryId);
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const addDescriptionField = (symptomId, categoryId) => {
    let _symptoms = disease.symptoms;
    const symptomIndex = _symptoms.findIndex(
      (symptom) => symptom.id === symptomId
    );
    const categoryIndex = _symptoms[symptomIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    _symptoms[symptomIndex].categories[categoryIndex].descriptions.push({
      id: uuidv4(),
      descriptionDetail: "",
    });
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const updateDescriptionsField = (
    symptomId,
    categoryId,
    descriptionId,
    event
  ) => {
    let _symptoms = disease.symptoms;
    const symptomIndex = _symptoms.findIndex(
      (symptom) => symptom.id === symptomId
    );
    const categoryIndex = _symptoms[symptomIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    const descriptionIndex = _symptoms[symptomIndex].categories[
      categoryIndex
    ].descriptions.findIndex((description) => description.id === descriptionId);
    _symptoms[symptomIndex].categories[categoryIndex].descriptions[
      descriptionIndex
    ][event.target.name] = event.target.value;
    setDisease({ ...disease, symptoms: _symptoms });
  };

  const deleteDescriptionsField = (symptomId, categoryId, descriptionId) => {
    let _symptoms = disease.symptoms;
    const symptomIndex = _symptoms.findIndex(
      (symptom) => symptom.id === symptomId
    );
    const categoryIndex = _symptoms[symptomIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    _symptoms[symptomIndex].categories[categoryIndex].descriptions = _symptoms[
      symptomIndex
    ].categories[categoryIndex].descriptions.filter(
      (description) => description.id !== descriptionId
    );
    setDisease({ ...disease, symptoms: _symptoms });
  };

  return (
    <div className="row pt-3 pb-3">
      {disease.symptoms.map((symptom) => (
        <div key={symptom.id}>
          <div className="form-group row pb-5">
            {chosenSymps.includes(symptom.id) ? null : (
              <i
                class="btn py-0 px-0 bi bi-file-minus"
                style={{ color: "#000", marginRight: "5px" }}
                onClick={() => deleteSymptomField(symptom.id)}
              ></i>
            )}
            <h4 className="card-title text-body col-3">Tên triệu chứng:</h4>
            <input
              type="text"
              className="form-control border-secondary-subtle col"
              name="name"
              value={symptom.name}
              disabled={chosenSymps.includes(symptom.id)}
              onChange={(e) => updateSymptomField(symptom.id, e)}
            />
          </div>
          <h4 className="card-title text-body">Mô tả chi tiết:</h4>
          {symptom.categories.map((category) => {
            return (
              <div key={category.id}>
                <div className="form row pb-3 mt-5">
                  <div className="col-2" style={{ display: "flex" }}>
                    {chosenCats.includes(category.id) ? null : (
                      <i
                        class="btn py-0 px-0 bi bi-file-minus"
                        style={{ color: "#000", marginRight: "5px" }}
                        onClick={() =>
                          deleteCategoryField(symptom.id, category.id)
                        }
                      ></i>
                    )}
                    <h5 className="text-body">Thuộc tính:</h5>
                  </div>
                  <select
                    name="categoryName"
                    value={category.categoryName}
                    className="form-select border-secondary-subtle col"
                    disabled={chosenCats.includes(category.id)}
                    onChange={(e) =>
                      updateCategoryField(symptom.id, category.id, e)
                    }
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
                      {chosenDes.includes(description.id) ? null : (
                        <i
                          class="btn py-0 px-0 bi bi-file-minus"
                          style={{ color: "#000", marginRight: "5px" }}
                          onClick={(e) =>
                            deleteDescriptionsField(
                              symptom.id,
                              category.id,
                              description.id
                            )
                          }
                        ></i>
                      )}
                      <input
                        name="descriptionDetail"
                        value={description.descriptionDetail}
                        type="text"
                        className="form-control border-secondary-subtle "
                        placeholder="Mô tả"
                        disabled={chosenDes.includes(description.id)}
                        onChange={(e) =>
                          updateDescriptionsField(
                            symptom.id,
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
                    <div
                      onClick={() =>
                        addDescriptionField(symptom.id, category.id)
                      }
                    >
                      <i class="text-secondary fs-3 bi bi-plus-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            onClick={() => addCategoryField(symptom.id)}
            className="btn btn-secondary bg-gradient mt-5"
          >
            Thêm thuộc tính
          </div>
        </div>
      ))}
      <div
        onClick={() => addSymptomField()}
        className="btn btn-secondary bg-gradient mt-5"
      >
        Thêm triệu chứng
      </div>
      <hr></hr>
    </div>
  );
};

export default DiseaseNewSympDes;
