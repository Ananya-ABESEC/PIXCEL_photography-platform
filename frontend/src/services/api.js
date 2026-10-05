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

  const response = await fetch(`${API_URL}/photos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(photoData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add photo");
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