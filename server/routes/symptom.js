const express = require("express");

// symptomRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /symptom.
const symptomRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the symptoms.
symptomRoutes.route("/symptom").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const result = await db_connect.collection("symptoms").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you get a single symptom by id
symptomRoutes.route("/symptom/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("symptoms").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you create a new symptom.
symptomRoutes.route("/symptom/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
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

// This section will help you update a symptom by id.
symptomRoutes.route("/symptom/update/:id").post(async function (req, res) {
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
      .collection("symptoms")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you delete a symptom
symptomRoutes.route("/symptom/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("symptoms").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = symptomRoutes;
