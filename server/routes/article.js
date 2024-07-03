const express = require("express");
const articleRoutes = express.Router();
const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");
const multer = require("multer");
const { Upload } = require("@aws-sdk/lib-storage");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const stream = require("stream");
require("dotenv").config({ path: "../.config.env" });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function fileFilter(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
}

const s3Storage = multer.memoryStorage();
const upload = multer({
  storage: s3Storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // limit size
  fileFilter: fileFilter,
});

// ------------------------------- Check access -------------------------------

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
  if (!req.role || req.role === "") {
    return res
      .status(403)
      .json({ message: "Forbidden (Staff access required)" });
  }
  next();
};

// Middleware to check for head-doctor role
const isHeadDoctor = (req, res, next) => {
  if (req.role === "head-doctor") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Head-doctor access required)" });
  }
};

// Middleware to check for doctor and head-doctor
const isDrOrHDr = (req, res, next) => {
  if (req.role === "doctor" || req.role === "head-doctor") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Doctor or Head-doctor access required)" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Admin access required)" });
  }
};

// ------------------------------- Article ------------------------------------
// get all articles
articleRoutes.route("/article").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const result = await db_connect.collection("articles").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get article by id
articleRoutes.route("/article/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get article by title
articleRoutes.route("/article/:title").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { title: req.params.title };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get articles by diseaseId
articleRoutes
  .route("/article/by-disease/:diseaseId")
  .get(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const result = await db_connect
        .collection("articles")
        .find({ diseaseId: req.params.diseaseId })
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get articles by many ids (articles by disease)
articleRoutes.route("/article/by-ids").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const result = await db_connect
      .collection("articles")
      .find({ id: { $in: req.query.ids } })
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get article by title (check duplicate)
articleRoutes.route("/article/:title").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const myquery = { title: req.params.title };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// set default display article
articleRoutes
  .route("/article/:articleId/set-isdisplay")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const displayArticle = await db_connect
        .collection("articles")
        .findOne({ diseaseId: req.body.diseaseId, isDisplay: true });
      if (displayArticle) {
        await db_connect.collection("articles").updateOne(
          { id: displayArticle.id },
          {
            $set: {
              isDisplay: false,
            },
          }
        );
      }
      const result = await db_connect.collection("articles").updateOne(
        { id: req.params.articleId },
        {
          $set: {
            isDisplay: true,
          },
        }
      );
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

      const uploadParams = {
        Bucket: "mybkcarebucket",
        Key: Date.now().toString() + "-" + uploadedImage.originalname,
        Body: stream.Readable.from(uploadedImage.buffer),
        ACL: "public-read",
      };

      const uploader = new Upload({
        client: s3,
        params: uploadParams,
      });

      await uploader.done();

      res.json({
        link: `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`, // this is the S3 URL of the uploaded image
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Delete image from s3
articleRoutes
  .route("/article/deleteImg")
  .post(verifyJWT, isDrOrHDr, async function (req, res) {
    try {
      const { key } = req.body; // the key of the image to delete
      if (!key) {
        throw new Error("No key provided");
      }

      const deleteParams = {
        Bucket: "mybkcarebucket",
        Key: key,
      };

      await s3.send(new DeleteObjectCommand(deleteParams));

      res.json({
        message: `Image with key ${key} deleted successfully`,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

// add article
articleRoutes
  .route("/article/add")
  .post(verifyJWT, isDrOrHDr, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
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
        isDisplay: req.body.isDisplay,
        status: req.body.status,
      };
      const result = await db_connect.collection("articles").insertOne(myobj);
      res.json({ result, myobj });
    } catch (err) {
      throw err;
    }
  });

// update article info by id
articleRoutes
  .route("/article/edit/:id")
  .put(verifyJWT, isDrOrHDr, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          title: req.body.title,
          infos: req.body.infos,
          treatments: req.body.treatments,
          createInfos: req.body.createInfos,
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("articles")
        .updateOne(myquery, newvalues);
      res.json({ result, newvalues });
    } catch (err) {
      throw err;
    }
  });

// update article status by id
articleRoutes
  .route("/article/update/:id")
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
        .collection("articles")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// delete article by id
articleRoutes
  .route("/article/delete/:id")
  .delete(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect.collection("articles").deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

module.exports = articleRoutes;
