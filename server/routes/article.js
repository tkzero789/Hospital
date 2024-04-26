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

// get all articles in temp
articleRoutes.route("/article-temp").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("articles-temp")
      .find({})
      .toArray();
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

// get article by id in temp
articleRoutes.route("/article-temp/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect
      .collection("articles-temp")
      .findOne(myquery);
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

// get articles by many ids  in temp
articleRoutes.route("/article-temp/by-ids").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("articles-temp")
      .find({ id: { $in: req.body.ids } })
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get default display article
articleRoutes.route("/article/get-isdisplay").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("articles")
      .findOne({ diseaseId: req.body.diseaseId, isDisplay: true });
    console.log(result);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// set default display article
articleRoutes.route("/article/set-isdisplay").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.body.id };
    const newvalues = {
      $set: {
        isDisplay: req.body.isDisplay,
      },
    };
    const result = await db_connect
      .collection("articles")
      .updateOne(myquery, newvalues);
    console.log(result);
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
      medSpecialty: req.body.medSpecialty,
      infos: req.body.infos,
      treatments: req.body.treatments,
      createInfos: req.body.createInfos,
      isDisplay: false,
      status: req.body.status,
    };
    const result = await db_connect.collection("articles").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// add article in temp
articleRoutes.route("/article-temp/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const { title, diseaseId } = req.body;
    const dupCheck = await db_connect
      .collection("articles-temp")
      .findOne({ title, diseaseId });
    if (dupCheck) {
      return res.json({ message: "Article already exists" });
    }
    const myobj = {
      id: req.body.id,
      title: req.body.title,
      diseaseId: req.body.diseaseId,
      diseaseName: req.body.diseaseName,
      medSpecialty: req.body.medSpecialty,
      infos: req.body.infos,
      treatments: req.body.treatments,
      createInfos: req.body.createInfos,
      isDisplay: false,
      status: req.body.status,
    };
    const result = await db_connect
      .collection("articles-temp")
      .insertOne(myobj);
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
        medSpecialty: req.body.medSpecialty,
        infos: req.body.infos,
        treatments: req.body.treatments,
        createInfos: req.body.createInfos,
        status: req.body.status,
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

// delete article by id
articleRoutes.route("/article-temp/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect
      .collection("articles-temp")
      .deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = articleRoutes;
