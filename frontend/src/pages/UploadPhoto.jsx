import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPhoto } from "../services/api";

function UploadPhoto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [visibility, setVisibility] = useState("private");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      setMessage("Please select a photograph.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("collection_id", id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("visibility", visibility);
      formData.append("photo", photo);

      await createPhoto(formData);

      setMessage("Photo uploaded successfully!");

      setTimeout(() => {
        navigate(`/collections/${id}`);
      }, 1000);
    } catch (error) {
      console.error("Upload photo error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Upload Photograph</h1>

      <p>Collection ID: {id}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Photo Title</label>
          <br />
          <input
            type="text"
            placeholder="Enter photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            placeholder="Describe your photograph"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Select Photograph</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>

        <br />

        {photo && (
          <p>
            Selected file: <strong>{photo.name}</strong>
          </p>
        )}

        <div>
          <label>Visibility</label>
          <br />
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <br />

        <button type="submit">Upload Photograph</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadPhoto;