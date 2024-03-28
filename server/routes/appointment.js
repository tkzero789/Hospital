const express = require("express");
const appointmentRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

appointmentRoutes.route("/appointment").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("appointments")
      .find({})
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

appointmentRoutes.route("/appointment/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("appointments").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

appointmentRoutes.route("/appointment/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myobj = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      need: req.body.need,
      date: req.body.date,
      reason: req.body.reason,
      createdAt: req.body.createdAt,
    };
    const result = await db_connect.collection("appointments").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

appointmentRoutes
  .route("/appointment/update/:id")
  .post(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { _id: new ObjectId(req.params.id) };
      const newvalues = {
        $set: {
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          dob: req.body.dob,
          gender: req.body.gender,
          need: req.body.need,
          date: req.body.date,
          reason: req.body.reason,
          createdAt: req.body.createdAt,
        },
      };
      const result = await db_connect
        .collection("appointments")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

appointmentRoutes.route("/appointment/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect
      .collection("appointments")
      .deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = appointmentRoutes;
