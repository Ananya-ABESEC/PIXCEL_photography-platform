const express = require("express");
const multer = require("multer");
const pool = require("../db");
const cloudinary = require("../cloudinary");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Store uploaded files temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// Add a photograph
router.post(
  "/",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    try {
      const {
        collection_id,
        title,
        description,
        visibility,
      } = req.body;

      if (!collection_id || !title || !req.file) {
        return res.status(400).json({
          message: "Collection ID, title and photo are required",
        });
      }

      // Check that the collection belongs to the logged-in photographer
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

      // Upload the original file to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "photography-platform/originals",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(req.file.buffer);
      });

      // Save the Cloudinary URL in PostgreSQL
      const result = await pool.query(
        `INSERT INTO photos
         (
           collection_id,
           title,
           description,
           original_file_url,
           display_file_url,
           visibility
         )
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          collection_id,
          title,
          description || null,
          uploadResult.secure_url,
          uploadResult.secure_url,
          visibility || "private",
        ]
      );

      res.status(201).json({
        message: "Photo uploaded successfully",
        photo: result.rows[0],
      });
    } catch (error) {
      console.error("Photo upload error:", error);

      res.status(500).json({
        message: "Photo upload failed",
      });
    }
  }
);

// Get photographs in a collection
router.get(
  "/collection/:collectionId",
  authMiddleware,
  async (req, res) => {
    try {
      const { collectionId } = req.params;

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
  }
);


/*
  Update photograph details.
  The original image file is not modified.
*/
router.patch("/:photoId", authMiddleware, async (req, res) => {
  try {
    const { photoId } = req.params;
    const { title, description, visibility } = req.body;

    // Validate the photo ID
    if (!/^\d+$/.test(photoId)) {
      return res.status(400).json({
        message: "Invalid photo ID",
      });
    }

    // Validate the supplied fields
    if (
      title === undefined &&
      description === undefined &&
      visibility === undefined
    ) {
      return res.status(400).json({
        message: "Provide at least one field to update",
      });
    }

    if (
      title !== undefined &&
      (typeof title !== "string" || !title.trim())
    ) {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }

    if (
      description !== undefined &&
      typeof description !== "string"
    ) {
      return res.status(400).json({
        message: "Description must be text",
      });
    }

    if (
      visibility !== undefined &&
      !["public", "private"].includes(visibility)
    ) {
      return res.status(400).json({
        message: "Visibility must be public or private",
      });
    }

    // Update only a photo belonging to the logged-in user
    const result = await pool.query(
      `UPDATE photos AS p
       SET
         title = COALESCE($1, p.title),
         description = COALESCE($2, p.description),
         visibility = COALESCE($3, p.visibility)
       FROM collections AS c
       WHERE p.id = $4
         AND p.collection_id = c.id
         AND c.user_id = $5
       RETURNING
         p.id,
         p.collection_id,
         p.title,
         p.description,
         p.original_file_url,
         p.display_file_url,
         p.visibility,
         p.created_at`,
      [
        title === undefined ? null : title.trim(),
        description === undefined ? null : description,
        visibility === undefined ? null : visibility,
        photoId,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Photo not found or access denied",
      });
    }

    res.status(200).json({
      message: "Photo details updated successfully",
      photo: result.rows[0],
    });
  } catch (error) {
    console.error("Update photo error:", error);

    res.status(500).json({
      message: "Failed to update photo details",
    });
  }
});


module.exports = router;