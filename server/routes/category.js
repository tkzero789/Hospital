const express = require("express");
const categoryRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

categoryRoutes.route("/category").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("categories").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

categoryRoutes.route("/category/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("categories").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

categoryRoutes.route("/category/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
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

categoryRoutes.route("/category/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
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

categoryRoutes.route("/category/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("categories").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = categoryRoutes;
