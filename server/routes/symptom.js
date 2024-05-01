const express = require("express");
const symptomRoutes = express.Router();
const dbo = require("../db/conn");

symptomRoutes.route("/symptom").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("symptoms").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom-temp").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("symptoms-temp")
      .find({})
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("symptoms").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom-temp/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect
      .collection("symptoms-temp")
      .findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom-temp/by-ids").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("symptoms-temp")
      .find({ id: { $in: req.body.ids }, diseaseId: req.body.diseaseId })
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const dupCheck = await db_connect
      .collection("symptoms")
      .findOne({ name: req.body.name });
    if (dupCheck) {
      return res.json({ message: "Symptom already exists" });
    } else {
      const myobj = {
        id: req.body.id,
        name: req.body.name,
        categories: req.body.categories,
        position: req.body.position,
        status: req.body.status,
      };
      const result = await db_connect.collection("symptoms").insertOne(myobj);
      res.json(result);
    }
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom-temp/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const dupCheck = await db_connect
      .collection("symptoms-temp")
      .findOne({ name: req.body.name });
    if (dupCheck && req.body.status === "Pending Create") {
      return res.json({ message: "Symptom already exists" });
    } else {
      const myobj = {
        id: req.body.id,
        diseaseId: req.body.diseaseId,
        name: req.body.name,
        ...(req.body.position && { position: req.body.position }),
        categories: req.body.categories,
        ...(req.body.createInfos && { createInfos: req.body.createInfos }),
        status: req.body.status,
      };
      const result = await db_connect
        .collection("symptoms-temp")
        .insertOne(myobj);
      res.json(result);
    }
  } catch (err) {
    throw err;
  }
});

symptomRoutes.route("/symptom/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const newvalues = {
      $set: {
        id: req.body.id,
        name: req.body.name,
        position: req.body.position,
        categories: req.body.categories,
        status: req.body.status,
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

symptomRoutes
  .route("/symptom/update-from-disease/:id")
  .post(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const searchRes = await db_connect
        .collection("symptoms")
        .findOne(myquery);
      const _categories = searchRes.categories;
      const existCatIds = _categories.map((cat) => cat.id);
      const reqCategories = req.body.categories;
      for (const reqCat of reqCategories) {
        if (!existCatIds.includes(reqCat.id)) {
          _categories.push(reqCat);
        } else {
          const catIndex = existCatIds.findIndex(
            (catId) => catId === reqCat.id
          );
          const existDesIds = _categories[catIndex].descriptions.map(
            (des) => des.id
          );
          for (const reqDes of reqCat.descriptions) {
            if (!existDesIds.includes(reqDes.id)) {
              _categories[catIndex].descriptions.push(reqDes);
            }
          }
        }
      }
      const newvalues = {
        $set: {
          categories: _categories,
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
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("symptoms").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

symptomRoutes
  .route("/symptom-temp/:symptomId/:diseaseId")
  .delete(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = {
        id: req.params.symptomId,
        diseaseId: req.params.diseaseId,
      };
      const result = await db_connect
        .collection("symptoms-temp")
        .deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

module.exports = symptomRoutes;
