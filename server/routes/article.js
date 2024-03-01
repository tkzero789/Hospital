const express = require("express");

// articleRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /article.
const articleRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the articles.
articleRoutes.route("/article").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const result = await db_connect.collection("articles").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you get a single article by id
articleRoutes.route("/article/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you create a new article.
articleRoutes.route("/article/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
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

// This section will help you update a article by id.
articleRoutes.route("/article/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
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

// This section will help you delete a article
articleRoutes.route("/article/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("articles").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = articleRoutes;
