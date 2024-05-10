const express = require("express");
const blogRoutes = express.Router();
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

blogRoutes.route("/blog").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("blogs").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

blogRoutes.route("/blog/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myobj = {
      id: req.body.id,
      title: req.body.title,
      image: req.body.image,
      content: req.body.content,
      createdAt: req.body.createdAt,
    };
    const result = await db_connect.collection("blogs").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

blogRoutes
  .route("/blog/upload")
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

module.exports = blogRoutes;
