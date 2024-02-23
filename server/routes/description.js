const express = require("express");

// descriptionRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /description.
const descriptionRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the descriptions.
descriptionRoutes.route("/description").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const result = await db_connect
      .collection("descriptions")
      .find({})
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you get a single description by id
descriptionRoutes.route("/description/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("descriptions").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you create a new description.
descriptionRoutes.route("/description/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myobj = {
      detail: req.body.desriptionDetail,
    };
    const result = await db_connect.collection("descriptions").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you update a description by id.
descriptionRoutes
  .route("/description/update/:id")
  .post(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("employees");
      const myquery = { _id: new ObjectId(req.params.id) };
      const newvalues = {
        $set: {
          detail: req.body.desriptionDetail,
        },
      };
      const result = await db_connect
        .collection("descriptions")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// This section will help you delete a description
descriptionRoutes.route("/description/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect
      .collection("descriptions")
      .deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = descriptionRoutes;
