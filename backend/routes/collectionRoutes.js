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

// Get all collections of the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, description, visibility, created_at
       FROM collections
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      collections: result.rows,
    });

  } catch (error) {
    console.error("Get collections error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get a single collection
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, name, description, visibility, created_at
       FROM collections
       WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Collection not found or access denied",
      });
    }

    res.status(200).json({
      collection: result.rows[0],
    });

  } catch (error) {
    console.error("Get collection error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Update a collection
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, visibility } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Collection name is required",
      });
    }

    const result = await pool.query(
      `UPDATE collections
       SET name = $1,
           description = $2,
           visibility = $3
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [
        name,
        description || null,
        visibility || "private",
        id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    res.status(200).json({
      message: "Collection updated successfully",
      collection: result.rows[0],
    });

  } catch (error) {
    console.error("Update collection error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Delete a collection
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM collections
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    res.status(200).json({
      message: "Collection deleted successfully",
      collection: result.rows[0],
    });

  } catch (error) {
    console.error("Delete collection error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;