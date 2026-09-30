const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});