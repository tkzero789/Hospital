const express = require("express");
const diseaseRoutes = express.Router();
const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");

const verifyJWT = (req, res, next) => {
  console.log(req.headers);
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

// Middleware to check for admin role
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

// Middleware to check for admin role
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

// get all
diseaseRoutes.route("/disease").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("diseases").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get all in disease-temp
diseaseRoutes
  .route("/disease-temp")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("diseases-temp")
        .find({})
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get by id
diseaseRoutes.route("/disease/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("diseases").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get by id in disease-temp
diseaseRoutes
  .route("/disease-temp/:id")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect
        .collection("diseases-temp")
        .findOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// add whole new disease
diseaseRoutes
  .route("/disease/add")
  .post(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
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
          symptoms: req.body.symptoms,
          medSpecialty: req.body.medSpecialty,
          relatedArticles: req.body.relatedArticles,
          createInfos: req.body.createInfos,
          status: req.body.status,
        };
        const result = await db_connect.collection("diseases").insertOne(myobj);
        res.json(result);
      }
    } catch (err) {
      throw err;
    }
  });

// add whole new disease temporarily
diseaseRoutes
  .route("/disease-temp/add")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const dupCheck = await db_connect
        .collection("diseases-temp")
        .findOne({ name: req.body.name });
      if (dupCheck) {
        return res.status(409).json({ message: "Disease already exists" });
      } else {
        const myobj = {
          id: req.body.id,
          name: req.body.name,
          ageRanges: req.body.ageRanges,
          genders: req.body.genders,
          symptoms: req.body.symptoms,
          medSpecialty: req.body.medSpecialty,
          relatedArticles: req.body.relatedArticles,
          createInfos: req.body.createInfos,
          status: req.body.status,
        };
        const result = await db_connect
          .collection("diseases-temp")
          .insertOne(myobj);
        res.json(result);
      }
    } catch (err) {
      throw err;
    }
  });

// update by id
diseaseRoutes
  .route("/disease/update/:id")
  .post(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          name: req.body.name,
          ageRanges: req.body.ageRanges,
          genders: req.body.genders,
          symptoms: req.body.symptoms,
          medSpecialty: req.body.medSpecialty,
          relatedArticles: req.body.relatedArticles,
          createInfos: req.body.createInfos,
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

// add new article to relatedArticles array of disease with id
diseaseRoutes
  .route("/disease/:diseaseId/add-article")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.diseaseId };
      const action = {
        $push: {
          relatedArticles: req.body,
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

// update article with id (req.body) in relatedArticles array of disease with id (req.params)
diseaseRoutes
  .route("/disease/:diseaseId/update-article/:articleId")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
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

// delete article with id (req.body) in relatedArticles array of disease with id (req.params)
diseaseRoutes
  .route("/disease/:diseaseId/delete-article/:articleId")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
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

// delete by id
diseaseRoutes
  .route("/disease/:id")
  .delete(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect.collection("diseases").deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// delete by id in diseases-temp
diseaseRoutes
  .route("/disease-temp/:id")
  .delete(verifyJWT, isHeadDoctor, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect
        .collection("diseases-temp")
        .deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get suitable diseases by patientForm
diseaseRoutes.route("/suit-diseases").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const diseases = await db_connect.collection("diseases").find({}).toArray();
    const patientForm = { ...req.body };
    const matchingDiseases = diseases
      .filter((disease) => {
        // Count matching details for each disease
        const matchingDetailsCount = disease.symptoms.reduce(
          (count, symptom) => {
            return (
              count +
              patientForm.patientSymptoms.reduce(
                (innerCount, patientSymptom) => {
                  if (patientSymptom.symptomName === symptom.symptomName) {
                    return (
                      innerCount +
                      symptom.categories.reduce((categoryCount, category) => {
                        return (
                          categoryCount +
                          category.descriptions.reduce(
                            (descriptionCount, description) => {
                              // Check for any match between patient and disease descriptions
                              const patientMatches = patientSymptom.categories
                                .flatMap((cat) => cat.descriptions)
                                .some((pd) =>
                                  description.descriptionDetail.includes(
                                    pd.descriptionDetail
                                  )
                                );
                              return (
                                descriptionCount + (patientMatches ? 1 : 0)
                              );
                            },
                            0
                          )
                        );
                      }, 0)
                    );
                  }
                  return innerCount;
                },
                0
              )
            );
          },
          0
        );

        disease.matchingDetailsCount = matchingDetailsCount;

        // Filter diseases with at least one matching detail
        return matchingDetailsCount > 0;
      })
      .sort((disease1, disease2) => {
        // Sort by matching details count (descending) and then by disease name (ascending)
        const countDiff =
          disease2.matchingDetailsCount - disease1.matchingDetailsCount;
        if (countDiff !== 0) return countDiff;
        return disease1.name.localeCompare(disease2.name);
      });

    // Add matchingDetailsCount property to each disease in the result
    res.json(matchingDiseases);
  } catch (err) {
    throw err;
  }
});

module.exports = diseaseRoutes;
