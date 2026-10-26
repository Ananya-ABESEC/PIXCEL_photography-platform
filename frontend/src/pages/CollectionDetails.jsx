
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCollectionById,
  getPhotosByCollection,
  updatePhoto,
} from "../services/api";
import "./CollectionDetails.css";

function CollectionDetails() {
  const { id } = useParams();

  const [collection, setCollection] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    visibility: "private",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadCollection = async () => {
    try {
      setError("");

      const collectionData = await getCollectionById(id);
      const photoData = await getPhotosByCollection(id);

      setCollection(collectionData);
      setPhotos(photoData);
    } catch (error) {
      console.error("Collection error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    loadCollection();
  }, [id]);

  const startEditing = (photo) => {
    setEditingPhotoId(photo.id);
    setEditForm({
      title: photo.title || "",
      description: photo.description || "",
      visibility: photo.visibility || "private",
    });
    setMessage("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const updatedPhoto = await updatePhoto(
        editingPhotoId,
        editForm
      );

      setPhotos((previous) =>
        previous.map((photo) =>
          photo.id === updatedPhoto.id ? updatedPhoto : photo
        )
      );

      setEditingPhotoId(null);
      setMessage("Photo details updated successfully!");
    } catch (error) {
      console.error("Update photo error:", error);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return <p className="collection-page">{error}</p>;
  }

  if (!collection) {
    return <p className="collection-page">Loading collection...</p>;
  }

  return (
    <main className="collection-page">
      <header className="collection-header">
        <div className="collection-info">
          <h1>{collection.name}</h1>

          <p className="collection-description">
            {collection.description || "No description"}
          </p>

          <div className="collection-meta">
            <span>Visibility: {collection.visibility}</span>

            <span>
              Created:{" "}
              {new Date(collection.created_at).toLocaleDateString()}
            </span>

            <span>
              {photos.length} {photos.length === 1 ? "photo" : "photos"}
            </span>
          </div>
        </div>

        <Link
          to={`/collections/${id}/upload`}
          className="upload-button"
        >
          + Upload Photo
        </Link>
      </header>

      {message && <p role="status">{message}</p>}

      <section>
        <h2 className="photos-heading">Your Photographs</h2>

        {photos.length === 0 ? (
          <div className="empty-gallery">
            <h3>Your gallery is waiting</h3>
            <p>Upload your first photograph to this collection.</p>
          </div>
        ) : (
          <div className="photo-grid">
            {photos.map((photo) => (
              <article className="photo-card" key={photo.id}>
                <img
                  className="photo-image"
                  src={
                    photo.display_file_url ||
                    photo.original_file_url
                  }
                  alt={photo.title}
                  loading="lazy"
                />

                <div className="photo-content">
                  {editingPhotoId === photo.id ? (
                    <form onSubmit={handleEditSubmit}>
                      <label>
                        Title
                        <input
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                          required
                        />
                      </label>

                      <label>
                        Description
                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                        />
                      </label>

                      <label>
                        Visibility
                        <select
                          name="visibility"
                          value={editForm.visibility}
                          onChange={handleEditChange}
                        >
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                        </select>
                      </label>

                      <button type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingPhotoId(null)}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h3>{photo.title}</h3>

                      <p>
                        {photo.description || "No description"}
                      </p>

                      <span className="photo-visibility">
                        {photo.visibility}
                      </span>

                      <div>
                        <button
                          type="button"
                          onClick={() => startEditing(photo)}
                        >
                          Edit Details
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default CollectionDetails;
