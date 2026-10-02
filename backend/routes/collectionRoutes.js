const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new collection
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, visibility } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Collection name is required",
      });
    }

    const result = await pool.query(
      `INSERT INTO collections (user_id, name, description, visibility)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        req.user.id,
        name,
        description || null,
        visibility || "private",
      ]
    );

    res.status(201).json({
      message: "Collection created successfully",
      collection: result.rows[0],
    });

  } catch (error) {
    console.error("Create collection error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;