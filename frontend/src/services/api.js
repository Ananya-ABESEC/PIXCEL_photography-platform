const API_URL = "http://localhost:5000/api";

export const getCollections = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/collections`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch collections");
  }

  return data.collections;
};

export const createCollection = async (collectionData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collectionData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create collection");
  }

  return data.collection;
};

export const getCollectionById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/collections/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch collection");
  }

  return data.collection;
};

export const createPhoto = async (photoData) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/photos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: photoData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload photo");
  }

  return data.photo;
};

export const getPhotosByCollection = async (collectionId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/photos/collection/${collectionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch photos");
  }

  return data.photos;
};

export const updatePhoto = async (photoId, updates) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/photos/${photoId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update photo");
  }

  return data.photo;
};

export const getCollectionCoverPhoto = async (collectionId) => {
  const photos = await getPhotosByCollection(collectionId);

  if (!Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  return (
    photos[0].display_file_url ||
    photos[0].original_file_url ||
    null
  );
};