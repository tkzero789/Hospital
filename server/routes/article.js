const express = require("express");
const articleRoutes = express.Router();
const dbo = require("../db/conn");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// set up multer to upload image
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// get all articles
articleRoutes.route("/article").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("articles").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get article by id
articleRoutes.route("/article/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get articles by many ids
articleRoutes.route("/article/by-ids").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("articles")
      .find({ id: { $in: req.body.ids } })
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// save image and get the link
articleRoutes
  .route("/article/upload")
  .post(upload.single("image"), async function (req, res) {
    try {
      const uploadedImage = req.file;
      if (!uploadedImage) {
        throw new Error("No image uploaded");
      }
      res.json({
        link: `http://localhost:5000/uploads/${uploadedImage.filename}`,
      });
    } catch (err) {
      throw err;
    }
  });

// add article
articleRoutes.route("/article/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const { title, diseaseId } = req.body;
    const dupCheck = await db_connect
      .collection("articles")
      .findOne({ title, diseaseId });
    if (dupCheck) {
      return res.json({ message: "Article already exists" });
    }
    const myobj = {
      id: req.body.id,
      title: req.body.title,
      diseaseId: req.body.diseaseId,
      diseaseName: req.body.diseaseName,
      infos: req.body.infos,
      treatments: req.body.treatments,
      createInfos: req.body.createInfos,
    };
    const result = await db_connect.collection("articles").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// update article by id
articleRoutes.route("/article/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const newvalues = {
      $set: {
        title: req.body.title,
        diseaseId: req.body.diseaseId,
        diseaseName: req.body.diseaseName,
        infos: req.body.infos,
        treatments: req.body.treatments,
        createInfos: req.body.createInfos,
      },
    };
    const result = await db_connect
      .collection("articles")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// delete article by id
articleRoutes.route("/article/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("articles").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// OUTDATED -> REMOVE
articleRoutes.route("/suit-articles").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const articles = await db_connect.collection("articles").find({}).toArray();
    const patientForm = { ...req.body };
    const matchingArticles = articles
      .filter((article) => {
        // Count matching details for each article
        const matchingDetailsCount = article.diseaseSymptoms.reduce(
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
                              // Check for any match between patient and article descriptions
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

        article.matchingDetailsCount = matchingDetailsCount;

        // Filter articles with at least one matching detail
        return matchingDetailsCount > 0;
      })
      .sort((article1, article2) => {
        // Sort by matching details count (descending) and then by article name (ascending)
        const countDiff =
          article2.matchingDetailsCount - article1.matchingDetailsCount;
        if (countDiff !== 0) return countDiff;
        return article1.diseaseName.localeCompare(article2.diseaseName);
      });

    // Add matchingDetailsCount property to each article in the result
    res.json(matchingArticles);
  } catch (err) {
    throw err;
  }
});

module.exports = articleRoutes;
