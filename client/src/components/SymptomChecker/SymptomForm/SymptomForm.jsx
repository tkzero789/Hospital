import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function SymptomForm({
  symptom,
  setSymptom,
  mode,
  origCats,
  origDescs,
}) {
  const categoryOptions = [
    { value: "Pain location", label: "Pain location" },
    { value: "Pain level", label: "Pain level" },
    { value: "Types of pain", label: "Types of pain" },
    {
      value: "Pain frequency",
      label: "Pain frequency",
    },
    {
      value: "Leading cause",
      label: "Leading cause",
    },
    {
      value: "The pain is getting worse when",
      label: "The pain is getting worse when",
    },
    { value: "Find relief by", label: "Find relief by" },
    { value: "Symptom(s)", label: "Symptom(s)" },
  ];

  const positionOptions = [
    { value: "Head", label: "Head" },
    { value: "Eyes", label: "Eyes" },
    { value: "Ears", label: "Ears" },
    { value: "Nose", label: "Nose" },
    { value: "Mouth", label: "Mouth" },
    { value: "Neck", label: "Neck" },
    { value: "Shoulder", label: "Shoulder" },
    { value: "Chest", label: "Chest" },
    { value: "Middle abdomen", label: "Middle abdomen" },
    { value: "Pelvis, gluteal and thigh", label: "Pelvis, gluteal and thigh" },
    { value: "Forearm", label: "Forearm" },
    { value: "Hand", label: "Hand" },
    { value: "Lower abdomen", label: "Lower abdomen" },
    { value: "Knee", label: "Knee" },
    { value: "Shin", label: "Shin" },
    { value: "Foot", label: "Foot" },
  ];

  function updateField(event) {
    setSymptom({ ...symptom, [event.target.name]: event.target.value });
  }

  function addCatField() {
    const newCat = {
      id: uuidv4(),
      categoryName: "Position",
      descriptions: [
        {
          id: uuidv4(),
          descriptionDetail: "",
          descriptionImg: "",
        },
      ],
    };
    setSymptom({ ...symptom, categories: [...symptom.categories, newCat] });
  }

  function updateCatField(categoryId, event) {
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const updatedCat = {
      ...cats[catIndex],
      [event.target.name]: event.target.value,
    };
    setSymptom({
      ...symptom,
      categories: [
        ...symptom.categories.slice(0, catIndex),
        updatedCat,
        ...symptom.categories.slice(catIndex + 1),
      ],
    });
  }

  function deleteCatField(categoryId) {
    setSymptom({
      ...symptom,
      categories: symptom.categories.filter((cat) => cat.id !== categoryId),
    });
  }

  function addDesField(categoryId) {
    const newDes = {
      id: uuidv4(),
      descriptionDetail: "",
      descriptionImg: "",
    };
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const updatedCat = {
      ...cats[catIndex],
      descriptions: [...cats[catIndex].descriptions, newDes],
    };
    setSymptom({
      ...symptom,
      categories: [
        ...cats.slice(0, catIndex),
        updatedCat,
        ...cats.slice(catIndex + 1),
      ],
    });
  }

  function updateDesField(categoryId, descriptionId, event) {
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const desIndex = cats[catIndex].descriptions.findIndex(
      (des) => des.id === descriptionId
    );
    const updatedCat = {
      ...cats[catIndex],
      descriptions: [
        ...cats[catIndex].descriptions.slice(0, desIndex),
        {
          ...cats[catIndex].descriptions[desIndex],
          [event.target.name]: event.target.value,
        },
        ...cats[catIndex].descriptions.slice(desIndex + 1),
      ],
    };
    setSymptom({
      ...symptom,
      categories: [
        ...cats.slice(0, catIndex),
        updatedCat,
        ...cats.slice(catIndex + 1),
      ],
    });
  }

  const deleteDesField = (categoryId, descriptionId) => {
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const updatedDescriptions = cats[catIndex].descriptions.filter(
      (des) => des.id !== descriptionId
    );
    if (updatedDescriptions.length === 0) {
      setSymptom({
        ...symptom,
        categories: symptom.categories.filter((cat) => cat.id !== categoryId),
      });
    } else {
      const updatedCat = {
        ...cats[catIndex],
        descriptions: updatedDescriptions,
      };
      setSymptom({
        ...symptom,
        categories: [
          ...cats.slice(0, catIndex),
          updatedCat,
          ...cats.slice(catIndex + 1),
        ],
      });
    }
  };

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="card-title text-dark-1 col-3">Symptom:</h4>
        <input
          type="text"
          className="form-control border-primary col border-dark-subtle shadow-sm"
          name="name"
          value={symptom.name}
          placeholder="Enter symptom name"
          disabled={mode === "view" || mode === "doctor edit"}
          onChange={(e) => updateField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="card-title text-dark-1 col-3">Position:</h4>
        <select
          name="position"
          value={symptom.position}
          className="form-select border-primary col border-dark-subtle shadow-sm"
          disabled={mode === "view" || mode === "doctor edit"}
          onChange={(e) => updateField(e)}
        >
          {positionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <h4 className="card-title text-dark-1">Description:</h4>
      {symptom.categories?.map((cat) => {
        return (
          <div key={cat.id}>
            <div className="form d-flex pb-3 mt-5">
              <div className="d-flex">
                {(mode === "create" ||
                  mode === "admin edit" ||
                  (mode === "doctor edit" && !origCats.includes(cat.id))) && (
                  <i
                    className="btn py-0 px-0 bi bi-file-minus me-2"
                    onClick={() => deleteCatField(cat.id)}
                  ></i>
                )}
                <h5 className="text-dark-1 pe-2">Properties:</h5>
              </div>
              <select
                name="categoryName"
                value={cat.categoryName}
                className="form-select border-secondary-subtle col"
                disabled={
                  mode === "view" ||
                  (mode === "doctor edit" && origCats.includes(cat.id))
                }
                onChange={(e) => updateCatField(cat.id, e)}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {cat.descriptions?.map((desc) => (
              <div key={desc.id} className="form d-flex pb-3">
                {(mode === "create" ||
                  (mode === "doctor edit" && !origDescs.includes(desc.id))) && (
                  <i
                    className="btn py-0 px-0 bi bi-file-minus me-2"
                    onClick={() => deleteDesField(cat.id, desc.id)}
                  ></i>
                )}
                <input
                  name="descriptionDetail"
                  value={desc.descriptionDetail}
                  type="text"
                  className="form-control border border-dark-subtle shadow-sm rounded "
                  placeholder="Description"
                  disabled={
                    mode === "view" ||
                    (mode === "doctor edit" && origDescs.includes(desc.id))
                  }
                  onChange={(e) => updateDesField(cat.id, desc.id, e)}
                />
              </div>
            ))}

            {(mode === "create" || mode === "doctor edit") && (
              <div className="row justify-content-center">
                <div className="col-1 rounded-5 btn btn-light border-secondary-subtle border-0 py-0 px-0">
                  <div onClick={() => addDesField(cat.id)}>
                    <i className="text-secondary fs-3 bi bi-plus-circle"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {(mode === "create" || mode === "doctor edit") && (
        <div
          onClick={addCatField}
          className="btn btn-secondary bg-gradient mt-5"
        >
          Add a property
        </div>
      )}
    </div>
  );
}
