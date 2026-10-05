import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCollectionById,
  getPhotosByCollection,
} from "../services/api";

function CollectionDetails() {
  const { id } = useParams();

  const [collection, setCollection] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const collectionData = await getCollectionById(id);
        const photoData = await getPhotosByCollection(id);

        setCollection(collectionData);
        setPhotos(photoData);
      } catch (error) {
        console.error("Collection error:", error);
        setError(error.message);
      }
    };

    loadCollection();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!collection) {
    return <p>Loading collection...</p>;
  }

  return (
    <div>
      <h1>{collection.name}</h1>

      <p>
        {collection.description || "No description"}
      </p>

      <p>
        Visibility: {collection.visibility}
      </p>

      <p>
        Created: {collection.created_at}
      </p>

      <Link to={`/collections/${id}/upload`}>
        <button>Upload Photo</button>
      </Link>

      <h2>Photos</h2>

      {photos.length === 0 ? (
        <p>No photos in this collection yet.</p>
      ) : (
        <div>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img
                src={photo.display_file_url || photo.original_file_url}
                alt={photo.title}
                width="300"
              />

              <h3>{photo.title}</h3>

              <p>
                {photo.description || "No description"}
              </p>

              <p>
                Visibility: {photo.visibility}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CollectionDetails;