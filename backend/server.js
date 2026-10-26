const express = require("express");
const cors = require("cors");
const pool = require("./db");
const cloudinary = require("./cloudinary");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const collectionRoutes = require("./routes/collectionRoutes");
const photoRoutes = require("./routes/photoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/photos", photoRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected:", result.rows[0]);
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Photography Platform API is running!"
  });
});

cloudinary.api.ping()
  .then(() => {
    console.log("Cloudinary connection successful!");
  })
  .catch((error) => {
    console.error("Cloudinary connection failed:", error.message);
  });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});