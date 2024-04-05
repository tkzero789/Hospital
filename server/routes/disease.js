const express = require("express");
const diseaseRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

diseaseRoutes.route("/disease").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("diseases").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

diseaseRoutes.route("/disease/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("diseases").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

diseaseRoutes.route("/disease/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myobj = {
      name: req.body.name,
      ageRanges: req.body.ageRanges,
      genders: req.body.genders,
      symptoms: req.body.symptoms,
      relatedArticles: req.body.relatedArticles,
    };
    const result = await db_connect.collection("diseases").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

diseaseRoutes.route("/disease/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const newvalues = {
      $set: {
        name: req.body.name,
        ageRanges: req.body.ageRanges,
        genders: req.body.genders,
        symptoms: req.body.symptoms,
      },
    };
    const result = await db_connect
      .collection("diseases")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

diseaseRoutes.route("/disease/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("diseases").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

diseaseRoutes.route("/disease-add-article/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const newvalues = {
      $set: {
        relatedArticles: req.body.relatedArticles,
      },
    };
    const result = await db_connect
      .collection("diseases")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

diseaseRoutes.route("/suit-diseases").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const diseases = await db_connect.collection("diseases").find({}).toArray();
    console.log(diseases);
    const patientForm = { ...req.body };
    console.log(patientForm);
    const matchingDiseases = diseases
      .filter((disease) => {
        // Count matching details for each disease
        const matchingDetailsCount = disease.symptoms.reduce(
          (count, symptom) => {
            return (
              count +
              patientForm.patientSymptoms.reduce(
                (innerCount, patientSymptom) => {
                  if (patientSymptom.symptomName === symptom.symptomName) {
                    return (
                      innerCount +
                      symptom.categories.reduce((categoryCount, category) => {
                        return (
                          categoryCount +
                          category.descriptions.reduce(
                            (descriptionCount, description) => {
                              // Check for any match between patient and disease descriptions
                              const patientMatches = patientSymptom.categories
                                .flatMap((cat) => cat.descriptions)
                                .some((pd) =>
                                  description.descriptionDetail.includes(
                                    pd.descriptionDetail
                                  )
                                );
                              return (
                                descriptionCount + (patientMatches ? 1 : 0)
                              );
                            },
                            0
                          )
                        );
                      }, 0)
                    );
                  }
                  return innerCount;
                },
                0
              )
            );
          },
          0
        );

        disease.matchingDetailsCount = matchingDetailsCount;

        // Filter diseases with at least one matching detail
        return matchingDetailsCount > 0;
      })
      .sort((disease1, disease2) => {
        // Sort by matching details count (descending) and then by disease name (ascending)
        const countDiff =
          disease2.matchingDetailsCount - disease1.matchingDetailsCount;
        if (countDiff !== 0) return countDiff;
        return disease1.name.localeCompare(disease2.name);
      });

    // Add matchingDetailsCount property to each disease in the result
    res.json(matchingDiseases);
  } catch (err) {
    throw err;
  }
});

module.exports = diseaseRoutes;
