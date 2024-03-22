const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = express.Router();
const dbo = require("../db/conn");
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

userRoutes.route("/signup").post(async function (req, res) {
  console.log(req.body);
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      role: req.body.role,
      doctorID: req.body.doctorID,
      userInfos: req.body.userInfos,
    };
    console.log("New User Object:", newUser);
    const result = await db_connect.collection("users").insertOne(newUser);
    console.log("Insertion Result:", result);
    res.status(201).json(result);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/signin").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const { email, phoneNumber, password } = req.body;
    const result = await db_connect.collection("users").findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, result.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.user = result;
    const token = jwt.sign(
      { userId: result._id, role: result.role },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
    res.status(200).json(result);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/signout").post(async function (req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Extracted Token:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const shortLivedToken = jwt.sign(
      { userId: "invalidated" },
      SECRET_JWT_KEY,
      {
        expiresIn: "1 second",
      }
    );
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = userRoutes;
