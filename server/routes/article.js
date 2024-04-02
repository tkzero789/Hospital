const express = require("express");
const articleRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

articleRoutes.route("/article").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("articles").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

articleRoutes.route("/article/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

articleRoutes.route("/article/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myobj = {
      title: req.body.title,
      author: req.body.author,
      diseaseName: req.body.diseaseName,
      diseaseAgeRanges: req.body.diseaseAgeRanges,
      diseaseGenders: req.body.diseaseGenders,
      diseaseSymptoms: req.body.diseaseSymptoms,
      diseaseInfos: req.body.diseaseInfos,
      diseaseTreatments: req.body.diseaseTreatments,
    };
    const result = await db_connect.collection("articles").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

articleRoutes.route("/article/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const newvalues = {
      $set: {
        name: req.body.name,
        categories: req.body.categories,
      },
    };
    const result = await db_connect
      .collection("articles")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

articleRoutes.route("/article/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("articles").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

articleRoutes.route("/suit-articles").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const articles = await db_connect.collection("articles").find({}).toArray();
    console.log(articles);
    const patientForm = { ...req.body };
    console.log(patientForm);
    const matchingArticles = articles
      .filter((article) => {
        // Count matching details for each article
        const matchingDetailsCount = article.diseaseSymptoms.reduce(
          (count, symptom) => {
            return (
              count +
              patientForm.diseaseSymptoms.reduce(
                (innerCount, patientSymptom) => {
                  if (patientSymptom.symptomName === symptom.symptomName) {
                    return (
                      innerCount +
                      symptom.categories.reduce((categoryCount, category) => {
                        return (
                          categoryCount +
                          category.descriptions.reduce(
                            (descriptionCount, description) => {
                              // Check for any match between patient and article descriptions
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

        // Filter articles with at least one matching detail
        return matchingDetailsCount > 0;
      })
      .sort((article1, article2) => {
        // Sort by matching details count (descending) and then by article name (ascending)
        const countDiff =
          article2.matchingDetailsCount - article1.matchingDetailsCount;
        if (countDiff !== 0) return countDiff;
        return article1.diseaseName.localeCompare(article2.diseaseName);
      });

    // Add matchingDetailsCount property to each article in the result
    matchingArticles.forEach((article) => {
      article.matchingDetailsCount = matchingDetailsCount; // Reference the previously calculated count
    });
    res.json(matchingArticles);
  } catch (err) {
    throw err;
  }
});

module.exports = articleRoutes;
