const express = require("express");
const symptomRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

symptomRoutes.route("/symptom").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("symptoms").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("symptoms").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myobj = {
      name: req.body.symptomName,
      categories: req.body.categories,
    };
    const result = await db_connect.collection("symptoms").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom/update/:id").post(async function (req, res) {
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
      .collection("symptoms")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("symptoms").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = symptomRoutes;
