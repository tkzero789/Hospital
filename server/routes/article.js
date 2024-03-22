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

module.exports = articleRoutes;
