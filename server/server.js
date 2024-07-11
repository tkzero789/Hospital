const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const dbo = require("./db/conn");

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Secret Date From Users",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use(require("./routes/symptom"));
app.use(require("./routes/article"));
app.use(require("./routes/user"));
app.use(require("./routes/appointment"));
app.use(require("./routes/disease"));
app.use(require("./routes/notification"));
app.use(require("./routes/blog"));

// Create blog indexes
async function createBlogIndexes() {
  try {
    const db = await dbo.getDb("hospital");
    const result = await db
      .collection("blogs")
      .createIndex({ slug: 1 }, { unique: true });
    if (result === "slug_1") {
      console.log("Blog slug index already exists");
    } else {
      console.log("Blog slug index created");
    }
  } catch (err) {
    console.error("Error creating blog slug index:", err);
  }
}

app.listen(port, async () => {
  try {
    await dbo.connectToServer();
    await createBlogIndexes();
    console.log(`Server is running on port: ${port}`);
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
