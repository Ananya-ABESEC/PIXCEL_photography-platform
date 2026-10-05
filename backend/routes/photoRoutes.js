const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a photo to a collection
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      collection_id,
      title,
      description,
      original_file_url,
      display_file_url,
      visibility,
    } = req.body;

    if (!collection_id || !title || !original_file_url) {
      return res.status(400).json({
        message: "Collection ID, title and original file URL are required",
      });
    }

    // Check that the collection belongs to the logged-in user
    const collection = await pool.query(
      `SELECT id
       FROM collections
       WHERE id = $1 AND user_id = $2`,
      [collection_id, req.user.id]
    );

    if (collection.rows.length === 0) {
      return res.status(404).json({
        message: "Collection not found or access denied",
      });
    }

    const result = await pool.query(
      `INSERT INTO photos
       (collection_id, title, description, original_file_url, display_file_url, visibility)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        collection_id,
        title,
        description || null,
        original_file_url,
        display_file_url || null,
        visibility || "private",
      ]
    );

    res.status(201).json({
      message: "Photo added successfully",
      photo: result.rows[0],
    });

  } catch (error) {
    console.error("Add photo error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get photos from a collection
router.get("/collection/:collectionId", authMiddleware, async (req, res) => {
  try {
    const { collectionId } = req.params;

    // Check that the collection belongs to the logged-in user
    const collection = await pool.query(
      `SELECT id
       FROM collections
       WHERE id = $1 AND user_id = $2`,
      [collectionId, req.user.id]
    );

    if (collection.rows.length === 0) {
      return res.status(404).json({
        message: "Collection not found or access denied",
      });
    }

    const result = await pool.query(
      `SELECT id, title, description,
              original_file_url,
              display_file_url,
              visibility,
              created_at
       FROM photos
       WHERE collection_id = $1
       ORDER BY created_at DESC`,
      [collectionId]
    );

    res.status(200).json({
      photos: result.rows,
    });

  } catch (error) {
    console.error("Get collection photos error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;