const express = require("express");
const appointmentRoutes = express.Router();
const dbo = require("../db/conn");

// Get all appointments
appointmentRoutes.route("/appointment").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const result = await db_connect
      .collection("appointments")
      .find({})
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Get appointment by ID
appointmentRoutes.route("/appointment/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    console.log(req.params.id);
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("appointments").findOne(myquery);
    console.log(result);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Get all appointments by phone number
appointmentRoutes
  .route("/appointment/:phoneNumber")
  .get(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { phoneNumber: req.params.phoneNumber };
      const result = await db_connect
        .collection("appointments")
        .find(myquery)
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// Add an appointment
appointmentRoutes.route("/appointment/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { phoneNumber: req.body.phoneNumber };
    const existAppts = await db_connect
      .collection("appointments")
      .find(myquery)
      .toArray();
    if (existAppts.find((appt) => appt.status === "Spam")) {
      return res.json({ message: "Phone number spamming" });
    }
    if (existAppts.find((appt) => appt.status === "Pending")) {
      return res.json({ message: "Phone number pending" });
    }
    const myobj = {
      id: req.body.id,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      need: req.body.need,
      date: req.body.date,
      reason: req.body.reason,
      createdAt: req.body.createdAt,
      status: req.body.status,
    };
    const result = await db_connect.collection("appointments").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Check for appointment with existed phone number
appointmentRoutes.route("/check-phone-number").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { phoneNumber: req.body.phoneNumber };
    const existAppts = await db_connect
      .collection("appointments")
      .find(myquery)
      .toArray();
    if (existAppts.find((appt) => appt.status === "Spam")) {
      return res.json({ exists: true, message: "Phone number spamming" });
    }
    if (existAppts.find((appt) => appt.status === "Pending")) {
      return res.json({ exists: true, message: "Phone number pending" });
    }
    return res.json({ exists: false });
  } catch (err) {
    throw err;
  }
});

// Update/Edit appointment status
appointmentRoutes
  .route("/appointment/update/:id")
  .post(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          status: req.body.status,
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

// Edit appointment info
appointmentRoutes
  .route("/appointment/edit/:id")
  .post(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
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

// Delete appointment
appointmentRoutes.route("/appointment/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect
      .collection("appointments")
      .deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = appointmentRoutes;
