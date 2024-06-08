const express = require("express");
const blogRoutes = express.Router();
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

// Middleware to check for admin
const isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Admin access required)" });
  }
};

// Fetch all blogs from database
blogRoutes.route("/blog").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    const result = await db_connect.collection("blogs").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Add a blog into database
blogRoutes
  .route("/blog/add")
  .post(verifyJWT, isDrOrHDr, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myobj = {
        id: req.body.id,
        title: req.body.title,
        intro: req.body.intro,
        image: req.body.image,
        content: req.body.content,
        author: req.body.author,
        doctorID: req.body.doctorID,
        createdAt: req.body.createdAt,
        status: req.body.status,
      };
      const result = await db_connect.collection("blogs").insertOne(myobj);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// Upload image to blog
blogRoutes
  .route("/blog/upload")
  .post(
    verifyJWT,
    isDrOrHDr,
    upload.single("image"),
    async function (req, res) {
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
    }
  );

// Delete image from s3
blogRoutes
  .route("/blog/delete")
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

// Fetch data of a specific blog
blogRoutes.route("/blog/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("hospital");
    console.log(req.params.id);
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("blogs").findOne(myquery);
    console.log(result);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Update status
blogRoutes
  .route("/blog/update/:id")
  .post(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("blogs")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// Edit blog
blogRoutes
  .route("/blog/edit/:id")
  .post(verifyJWT, isDrOrHDr, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          title: req.body.title,
          intro: req.body.intro,
          image: req.body.image,
          content: req.body.content,
          createdAt: req.body.createdAt,
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("blogs")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// Delete blog
blogRoutes
  .route("/blog/:id")
  .delete(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect.collection("blogs").deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

module.exports = blogRoutes;
