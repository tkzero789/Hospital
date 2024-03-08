const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.

// This section will help you get a list of all the users.
userRoutes.route("/signup").post(async function (req, res) {
  console.log(req.body);
  try {
    const db_connect = await dbo.getDb("employees");
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

// Sign in route
userRoutes.route("/signin").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("employees");
    const { _id, email, phoneNumber, password, role } = req.body;
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
    // Generate a JWT token
    const token = jwt.sign(
      { userId: _id, role: role },
      "my-secret-jwt-token-key",
      {
        expiresIn: "1h", // Token expiration time
      }
    );
    console.log(token);
    // Set the token as a cookie

    res.json({ token });

    res.status(200).json(result);
  } catch (err) {
    throw err;
  }
});

// Sign out route
userRoutes.route("/signout").post(async function (req, res) {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = userRoutes;
