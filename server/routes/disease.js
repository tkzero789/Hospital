const express = require("express");
const diseaseRoutes = express.Router();
const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid token" });
  }
  req.role = decoded.role;
  next();
};

// Middleware to check for staff role
const isStaff = (req, res, next) => {
  console.log(req);
  console.log(res.role);
  if (!req.role && req.role === "") {
    return res
      .status(403)
      .json({ message: "Forbidden (Staff access required)" });
  }
  next();
};

// Middleware to check for head doctor role
const isHeadDoctor = (req, res, next) => {
  if (req.role && req.role !== "head-doctor") {
    return res
      .status(403)
      .json({ message: "Forbidden (Head doctor access required)" });
  }
  next();
};

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
  if (req.role && req.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden (Head doctor access required)" });
  }
  next();
};

// Middleware to check for head-doctor or admin role
const isHDrOrAdmin = (req, res, next) => {
  if (req.role === "admin" || req.role === "head-doctor") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Head-doctor or Admin access required)" });
  }
};

// ------------------------------- Disease ------------------------------------

// get all diseases
diseaseRoutes.route("/disease").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const result = await db_connect.collection("diseases").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get disease by id
diseaseRoutes.route("/disease/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("diseases").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get disease by name (check duplicate)
diseaseRoutes.route("/disease/:name").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { name: req.params.name };
    const result = await db_connect.collection("diseases").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// add new disease
diseaseRoutes
  .route("/disease/add")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const dupCheck = await db_connect
        .collection("diseases")
        .findOne({ name: req.body.name });
      if (dupCheck) {
        return res.json({ message: "Disease already exists" });
      } else {
        const myobj = {
          id: req.body.id,
          name: req.body.name,
          ageRanges: req.body.ageRanges,
          genders: req.body.genders,
          symptomIds: req.body.symptomIds,
          descIds: req.body.descIds,
          medSpecialty: req.body.medSpecialty,
          relatedArticles: req.body.relatedArticles,
          createInfos: req.body.createInfos,
          status: req.body.status,
        };
        const result = await db_connect.collection("diseases").insertOne(myobj);
        res.json({ result, myobj });
      }
    } catch (err) {
      throw err;
    }
  });

// Update/edit disease info
diseaseRoutes
  .route("/disease/edit/:id")
  .put(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          name: req.body.name,
          ageRanges: req.body.ageRanges,
          genders: req.body.genders,
          symptomIds: req.body.symptomIds,
          descIds: req.body.descIds,
          createInfos: req.body.createInfos,
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("diseases")
        .updateOne(myquery, newvalues);
      res.json({ result, newvalues });
    } catch (err) {
      throw err;
    }
  });

// Update disease status by id
diseaseRoutes
  .route("/disease/update/:id")
  .put(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("diseases")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// delete by id
diseaseRoutes
  .route("/disease/delete/:id")
  .delete(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect.collection("diseases").deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });
// ------------------------------- Article part -------------------------------

// add new article to relatedArticles array of disease
diseaseRoutes
  .route("/disease/:diseaseId/add-article")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.diseaseId };
      const action = {
        $push: {
          relatedArticles: req.body,
        },
      };
      const result = await db_connect
        .collection("diseases")
        .updateOne(myquery, action);
      res.json({ result, action });
    } catch (err) {
      throw err;
    }
  });

// update article with id in relatedArticles array of disease
diseaseRoutes
  .route("/disease/:diseaseId/update-article/:articleId")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.diseaseId };
      const searchRes = await db_connect
        .collection("diseases")
        .findOne(myquery);
      const _articles = searchRes.relatedArticles.map((article) =>
        article.id === req.params.articleId ? req.body : article
      );
      const action = {
        $set: {
          relatedArticles: _articles,
        },
      };
      const result = await db_connect
        .collection("diseases")
        .updateOne(myquery, action);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// delete article with id in relatedArticles array of disease
diseaseRoutes
  .route("/disease/:diseaseId/delete-article/:articleId")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.diseaseId };
      const action = {
        $pull: {
          relatedArticles: { id: req.params.articleId },
        },
      };
      const result = await db_connect
        .collection("diseases")
        .updateOne(myquery, action);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

module.exports = diseaseRoutes;
