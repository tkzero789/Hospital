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
      apptDate: req.body.apptDate,
      email: req.body.email,
      phone: req.body.phone,
      fullName: req.body.fullName,
      gender: req.body.gender,
      dob: req.body.dob,
      medicalNeed: req.body.medicalNeed,
      healthCondition: req.body.healthCondition,
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
          apptDate: req.body.apptDate,
          email: req.body.email,
          phone: req.body.phone,
          fullName: req.body.fullName,
          gender: req.body.gender,
          dob: req.body.dob,
          medicalNeed: req.body.medicalNeed,
          healthCondition: req.body.healthCondition,
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
