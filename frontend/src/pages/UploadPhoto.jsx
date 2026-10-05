import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPhoto } from "../services/api";

function UploadPhoto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [originalFileUrl, setOriginalFileUrl] = useState("");
  const [displayFileUrl, setDisplayFileUrl] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPhoto({
        collection_id: id,
        title,
        description,
        original_file_url: originalFileUrl,
        display_file_url: displayFileUrl,
        visibility,
      });

      setMessage("Photo added successfully!");

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

        <input
          type="text"
          placeholder="Photo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Photo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="url"
          placeholder="Original photo URL"
          value={originalFileUrl}
          onChange={(e) => setOriginalFileUrl(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Display photo URL"
          value={displayFileUrl}
          onChange={(e) => setDisplayFileUrl(e.target.value)}
        />

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <button type="submit">
          Add Photograph
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadPhoto;