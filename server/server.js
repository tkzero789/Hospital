const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  next();
});
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Secret Date From Users", // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use(require("./routes/record"));
app.use(require("./routes/symptom"));
app.use(require("./routes/article"));
app.use(require("./routes/user"));
// get driver connection
const dbo = require("./db/conn");
app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
