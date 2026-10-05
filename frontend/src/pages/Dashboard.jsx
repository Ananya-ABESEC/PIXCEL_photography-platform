import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCollections,
  createCollection,
} from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (error) {
        console.error("Collection error:", error);
        setError(error.message);
      }
    };

    loadCollections();
  }, []);

  const handleCreateCollection = async (e) => {
  e.preventDefault();

  try {
    const newCollection = await createCollection({
      name,
      description,
      visibility,
    });

    setCollections((prev) => [newCollection, ...prev]);

    setName("");
    setDescription("");
    setVisibility("private");

    setMessage("Collection created successfully!");
  } catch (error) {
    console.error("Create collection error:", error);
    setMessage(error.message);
  }
};

  return (
    <div>
      <h1>Photography Platform</h1>

      <h2>
        Welcome, {user?.name || "Photographer"}!
      </h2>

      <p>Your Collections</p>

      {error && <p>{error}</p>}

      {collections.length === 0 ? (
        <p>No collections found.</p>
      ) : (
        <div>
          {collections.map((collection) => (
  <div key={collection.id}>
    <Link to={`/collections/${collection.id}`}>
      <h3>{collection.name}</h3>
    </Link>

    <p>
      {collection.description || "No description"}
    </p>

    <p>
      Visibility: {collection.visibility}
    </p>
  </div>
))}
        </div>
      )}

      <h2>Create Collection</h2>

<form onSubmit={handleCreateCollection}>
  <input
    type="text"
    placeholder="Collection name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <select
    value={visibility}
    onChange={(e) => setVisibility(e.target.value)}
  >
    <option value="private">Private</option>
    <option value="public">Public</option>
  </select>

  <button type="submit">
    Create Collection
  </button>
</form>

{message && <p>{message}</p>}
      <button>Upload Photo</button>
      <button>View Profile</button>
    </div>
  );
}

export default Dashboard;