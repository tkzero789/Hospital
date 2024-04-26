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

  const categoryOptions = [
    { value: "Vị trí", label: "Vị trí" },
    { value: "Mức độ", label: "Mức độ" },
    { value: "Như thế nào", label: "Như thế nào" },
    {
      value: "Thời gian bị và tần suất xảy ra",
      label: "Thời gian bị và tần suất xảy ra",
    },
    {
      value: "Tình trạng trước kia và sự kiện dẫn đến",
      label: "Tình trạng trước kia và sự kiện dẫn đến",
    },
    {
      value: "Xảy ra hoặc tồi tệ hơn khi",
      label: "Xảy ra hoặc tồi tệ hơn khi",
    },
    { value: "Yếu tố làm thuyên giảm", label: "Yếu tố làm thuyên giảm" },
    { value: "Các triệu chứng đi kèm", label: "Các triệu chứng đi kèm" },
  ];

  const positionOptions = [
    { value: "Đầu", label: "Đầu" },
    { value: "Mắt", label: "Mắt" },
    { value: "Tai", label: "Tai" },
    { value: "Mũi", label: "Mũi" },
    { value: "Miệng", label: "Miệng" },
    { value: "Cổ", label: "Cổ" },
    { value: "Vai", label: "Vai" },
    { value: "Ngực", label: "Ngực" },
    { value: "Bụng", label: "Bụng" },
    { value: "Hông, đùi và mông", label: "Hông, đùi và mông" },
    { value: "Cánh tay", label: "Cánh tay" },
    { value: "Bàn tay", label: "Bàn tay" },
    { value: "Vùng dưới", label: "Vùng dưới" },
    { value: "Đầu gối", label: "Đầu gối" },
    { value: "Cẳng chân", label: "Cẳng chân" },
    { value: "Bàn chân", label: "Bàn chân" },
  ];

  function addSymptomField() {
    const newSymptom = {
      id: uuidv4(),
      diseaseId: disease.id,
      name: "",
      position: "Đầu",
      categories: [
        {
          id: uuidv4(),
          categoryName: "Vị trí",
          descriptions: [
            {
              id: uuidv4(),
              descriptionDetail: "",
              descriptionImg: "",
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
      status: "Pending Create",
    };
    setDisease({
      ...disease,
      symptoms: [...disease.symptoms, newSymptom],
    });
  }

  function updateSymptomField(symptomId, event) {
    if (!symptomId) {
      return;
    }
    const symptoms = disease.symptoms;
    const sympIndex = symptoms.findIndex((symptom) => symptom.id === symptomId);
    const updatedSymptom = {
      ...symptoms[sympIndex],
      [event.target.name]: event.target.value,
    };
    setDisease({
      ...disease,
      symptoms: [
        ...symptoms.slice(0, sympIndex),
        updatedSymptom,
        ...symptoms.slice(sympIndex + 1),
      ],
    });
  }

  function deleteSymptomField(symptomId) {
    if (!symptomId) {
      return;
    }
    const symptoms = disease.symptoms;
    const updatedSymptoms = symptoms.filter(
      (symptom) => symptom.id !== symptomId
    );
    setDisease({ ...disease, symptoms: updatedSymptoms });
  }

  function addCategoryField(symptomId) {
    if (!symptomId) {
      return;
    }
    const newCategory = {
      id: uuidv4(),
      categoryName: "Vị trí",
      descriptions: [
        {
          id: uuidv4(),
          descriptionDetail: "",
          descriptionImg: "",
        },
      ],
    };
    const symptoms = disease.symptoms;
    const sympIndex = symptoms.findIndex((symptom) => symptom.id === symptomId);
    const updatedSymptom = {
      ...symptoms[sympIndex],
      categories: [...symptoms[sympIndex].categories, newCategory],
      status: "Pending Update",
    };
    setDisease({
      ...disease,
      symptoms: [
        ...symptoms.slice(0, sympIndex),
        updatedSymptom,
        ...symptoms.slice(sympIndex + 1),
      ],
    });
  }

  function updateCategoryField(symptomId, categoryId, event) {
    if (!symptomId || !categoryId) {
      return;
    }
    const symptoms = disease.symptoms;
    const sympIndex = symptoms.findIndex((symptom) => symptom.id === symptomId);
    const catIndex = symptoms[sympIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    const updatedSymptom = {
      ...symptoms[sympIndex],
      categories: [
        ...symptoms[sympIndex].categories.slice(0, catIndex),
        {
          ...symptoms[sympIndex].categories[catIndex],
          categoryName: event.target.value,
        },
        ...symptoms[sympIndex].categories.slice(catIndex + 1),
      ],
    };
    setDisease({
      ...disease,
      symptoms: [
        ...symptoms.slice(0, sympIndex),
        updatedSymptom,
        ...symptoms.slice(sympIndex + 1),
      ],
    });
  }

  function deleteCategoryField(symptomId, categoryId) {
    if (!symptomId || !categoryId) {
      return;
    }
    const symptoms = disease.symptoms;
    const sympIndex = symptoms.findIndex((symptom) => symptom.id === symptomId);
    const updatedCategories = symptoms[sympIndex].categories.filter(
      (category) => category.id !== categoryId
    );
    const updatedSymptom = {
      ...symptoms[sympIndex],
      categories: updatedCategories,
    };
    setDisease({
      ...disease,
      symptoms: [
        ...symptoms.slice(0, sympIndex),
        updatedSymptom,
        ...symptoms.slice(sympIndex + 1),
      ],
    });
  }

  function addDescriptionField(symptomId, categoryId) {
    if (!symptomId || !categoryId) {
      return;
    }
    const newDescription = {
      id: uuidv4(),
      descriptionDetail: "",
      descriptionImg: "",
    };
    const symptoms = disease.symptoms;
    const sympIndex = symptoms.findIndex((symptom) => symptom.id === symptomId);
    const catIndex = symptoms[sympIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    const updatedSymptom = {
      ...symptoms[sympIndex],
      categories: [
        ...symptoms[sympIndex].categories.slice(0, catIndex),
        {
          ...symptoms[sympIndex].categories[catIndex],
          descriptions: [
            ...symptoms[sympIndex].categories[catIndex].descriptions,
            newDescription,
          ],
        },
        ...symptoms[sympIndex].categories.slice(catIndex + 1),
      ],
      status: "Pending Update",
    };
    setDisease({
      ...disease,
      symptoms: [
        ...symptoms.slice(0, sympIndex),
        updatedSymptom,
        ...symptoms.slice(sympIndex + 1),
      ],
    });
  }

  function updateDescriptionsField(
    symptomId,
    categoryId,
    descriptionId,
    event
  ) {
    if (!symptomId || !categoryId || !descriptionId) {
      return;
    }
    const symptoms = disease.symptoms;
    const sympIndex = symptoms.findIndex((symptom) => symptom.id === symptomId);
    const catIndex = symptoms[sympIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    const desIndex = symptoms[sympIndex].categories[
      catIndex
    ].descriptions.findIndex((description) => description.id === descriptionId);
    const updatedSymptom = {
      ...symptoms[sympIndex],
      categories: [
        ...symptoms[sympIndex].categories.slice(0, catIndex),
        {
          ...symptoms[sympIndex].categories[catIndex],
          descriptions: [
            ...symptoms[sympIndex].categories[catIndex].descriptions.slice(
              0,
              desIndex
            ),
            {
              ...symptoms[sympIndex].categories[catIndex].descriptions[
                desIndex
              ],
              descriptionDetail: event.target.value,
            },
            ...symptoms[sympIndex].categories[catIndex].descriptions.slice(
              desIndex + 1
            ),
          ],
        },
        ...symptoms[sympIndex].categories.slice(catIndex + 1),
      ],
    };
    setDisease({
      ...disease,
      symptoms: [
        ...symptoms.slice(0, sympIndex),
        updatedSymptom,
        ...symptoms.slice(sympIndex + 1),
      ],
    });
  }

  function deleteDescriptionsField(symptomId, categoryId, descriptionId) {
    if (!symptomId || !categoryId || !descriptionId) {
      return;
    }
    const symptoms = disease.symptoms;
    const sympIndex = symptoms.findIndex((symptom) => symptom.id === symptomId);
    const catIndex = symptoms[sympIndex].categories.findIndex(
      (category) => category.id === categoryId
    );
    const updatedDescriptions = symptoms[sympIndex].categories[
      catIndex
    ].descriptions.filter((description) => description.id !== descriptionId);
    if (updatedDescriptions.length === 0) {
      const updatedCategories = symptoms[sympIndex].categories.filter(
        (category) => category.id !== categoryId
      );
      const updatedSymptom = {
        ...symptoms[sympIndex],
        categories: updatedCategories,
      };
      setDisease({
        ...disease,
        symptoms: [
          ...symptoms.slice(0, sympIndex),
          updatedSymptom,
          ...symptoms.slice(sympIndex + 1),
        ],
      });
    } else {
      const updatedSymptom = {
        ...symptoms[sympIndex],
        categories: [
          ...symptoms[sympIndex].categories.slice(0, catIndex),
          {
            ...symptoms[sympIndex].categories[catIndex],
            descriptions: updatedDescriptions,
          },
          ...symptoms[sympIndex].categories.slice(catIndex + 1),
        ],
      };
      setDisease({
        ...disease,
        symptoms: [
          ...symptoms.slice(0, sympIndex),
          updatedSymptom,
          ...symptoms.slice(sympIndex + 1),
        ],
      });
    }
  }

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
          {chosenSymps.includes(symptom.id) ? null : (
            <div className="form-group row pb-5">
              <h4 className="card-title text-body col-3">Vị trí:</h4>
              <select
                name="position"
                value={symptom.position}
                className="form-select border-secondary-subtle col"
                disabled={chosenSymps.includes(symptom.id)}
                onChange={(e) => updateSymptomField(symptom.id, e)}
              >
                {positionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
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
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
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
