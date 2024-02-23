const express = require("express");

// categoryRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /category.
const categoryRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the categories.
categoryRoutes.route("/category").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const result = await db_connect.collection("categories").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you get a single category by id
categoryRoutes.route("/category/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("categories").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you create a new category.
categoryRoutes.route("/category/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myobj = {
      name: req.body.categoryName,
      descriptions: req.body.descriptions,
    };
    const result = await db_connect.collection("categories").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you update a category by id.
categoryRoutes.route("/category/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const newvalues = {
      $set: {
        name: req.body.categoryName,
        descriptions: req.body.descriptions,
      },
    };
    const result = await db_connect
      .collection("categories")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you delete a category
categoryRoutes.route("/category/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("categories").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = categoryRoutes;
