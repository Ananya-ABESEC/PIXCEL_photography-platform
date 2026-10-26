
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCollections,
  createCollection,
  getCollectionCoverPhoto,
} from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  const [collections, setCollections] = useState([]);
  const [coverPhotos, setCoverPhotos] = useState({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");

  // Load collections and their latest photo covers
  useEffect(() => {
    let active = true;

    const loadCollections = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getCollections();
        const safeCollections = Array.isArray(data) ? data : [];

        if (!active) return;

        setCollections(safeCollections);

        const coverEntries = await Promise.all(
          safeCollections.map(async (collection) => {
            try {
              const cover = await getCollectionCoverPhoto(
                collection.id
              );

              return [collection.id, cover];
            } catch (err) {
              console.error(
                `Unable to load cover for collection ${collection.id}:`,
                err
              );

              return [collection.id, null];
            }
          })
        );

        if (active) {
          setCoverPhotos(Object.fromEntries(coverEntries));
        }
      } catch (err) {
        console.error("Collection error:", err);

        if (active) {
          setError(
            err.message || "Unable to load your collections."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCollections();

    return () => {
      active = false;
    };
  }, []);

  // Create a new collection
  const handleCreateCollection = async (e) => {
    e.preventDefault();

    setCreating(true);
    setError("");
    setMessage("");

    try {
      const newCollection = await createCollection({
        name: name.trim(),
        description: description.trim(),
        visibility,
      });

      setCollections((previous) => [
        newCollection,
        ...previous.filter(
          (collection) => collection.id !== newCollection.id
        ),
      ]);

      // Initialize the new collection's cover
      setCoverPhotos((previous) => ({
        ...previous,
        [newCollection.id]: null,
      }));

      setName("");
      setDescription("");
      setVisibility("private");
      setMessage("Your new collection is ready.");
    } catch (err) {
      console.error("Create collection error:", err);

      setError(
        err.message || "Unable to create the collection."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="dashboard-page">
      {/* Top bar */}
      <header className="dashboard-topbar">
        <span className="dashboard-topbar-note">
          YOUR PERSONAL PHOTOGRAPHY SPACE
        </span>
      </header>

      {/* Hero section */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <p className="dashboard-eyebrow">
            A JOURNAL OF YOUR VISUAL WORLD
          </p>

          <h1>
            Every photograph
            <br />
            <span>has a story.</span>
          </h1>

          <p className="dashboard-intro">
            Welcome back, {user?.name || "Photographer"}.
            <br />
            Gather your favourite moments, one collection at a time.
          </p>
        </div>

        <div
          className="dashboard-hero-mark"
          aria-hidden="true"
        >
          <span>p.</span>
          <small>EST. YOUR STORY</small>
        </div>
      </section>

      {/* Collections section */}
      <section className="dashboard-collections">
        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-eyebrow">
              KEEP YOUR MOMENTS CLOSE
            </p>
            <h2>Your collections</h2>
          </div>

          <span className="dashboard-count">
            {collections.length}{" "}
            {collections.length === 1
              ? "COLLECTION"
              : "COLLECTIONS"}
          </span>
        </div>

        {error && (
          <p className="dashboard-alert" role="alert">
            {error}
          </p>
        )}

        {message && (
          <p className="dashboard-success" role="status">
            {message}
          </p>
        )}

        {loading ? (
          <div
            className="dashboard-empty-state"
            role="status"
          >
            <span className="dashboard-loading-mark">p.</span>
            <h3>Turning the pages...</h3>
            <p>Your collections are on their way.</p>
          </div>
        ) : collections.length === 0 ? (
          <div className="dashboard-empty-state">
            <span className="dashboard-loading-mark">01</span>
            <h3>A fresh page awaits.</h3>
            <p>
              Create your first collection and start gathering
              the photographs that mean something to you.
            </p>
          </div>
        ) : (
          <div className="dashboard-collection-grid">
            {collections.map((collection, index) => (
              <article
                className="dashboard-collection-card"
                key={collection.id}
              >
                <div className="dashboard-card-topline">
                  <span>
                    NO. {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`dashboard-visibility ${
                      collection.visibility === "public"
                        ? "is-public"
                        : "is-private"
                    }`}
                  >
                    {collection.visibility || "private"}
                  </span>
                </div>

                {/* Collection cover image */}
                <div className="dashboard-card-cover">
                  {coverPhotos[collection.id] ? (
                    <img
                      src={coverPhotos[collection.id]}
                      alt={`Cover for ${collection.name}`}
                      loading="lazy"
                      onError={() => {
                        setCoverPhotos((previous) => ({
                          ...previous,
                          [collection.id]: null,
                        }));
                      }}
                    />
                  ) : (
                    <div className="dashboard-card-cover-placeholder">
                      <span aria-hidden="true">p.</span>
                      <small>YOUR VISUAL STORY</small>
                    </div>
                  )}
                </div>

                {/* Collection information */}
                <div className="dashboard-card-body">
                  <h3>
                    <Link
                      to={`/collections/${collection.id}`}
                    >
                      {collection.name}
                    </Link>
                  </h3>

                  <p>
                    {collection.description ||
                      "A collection of moments."}
                  </p>
                </div>

                <Link
                  className="dashboard-open-link"
                  to={`/collections/${collection.id}`}
                  aria-label={`Open collection ${collection.name}`}
                >
                  Explore collection{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Create collection section */}
      <section className="dashboard-create-section">
        <div className="dashboard-create-copy">
          <p className="dashboard-eyebrow">
            BEGIN SOMETHING NEW
          </p>

          <h2>A place for your next story.</h2>

          <p>
            A quiet corner for a journey, a season, a person,
            or a thousand little details.
          </p>

          <span
            className="dashboard-create-decoration"
            aria-hidden="true"
          >
            with intention, always.
          </span>
        </div>

        <form
          className="dashboard-create-form"
          onSubmit={handleCreateCollection}
        >
          <h3>Create a collection</h3>

          <p className="dashboard-form-subtitle">
            Give your photographs a home.
          </p>

          <label htmlFor="collection-name">
            Collection name
          </label>

          <input
            id="collection-name"
            type="text"
            placeholder="e.g. Quiet mornings"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />

          <label htmlFor="collection-description">
            A little description
          </label>

          <textarea
            id="collection-description"
            placeholder="What is this collection about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <label htmlFor="collection-visibility">
            Who can see it?
          </label>

          <select
            id="collection-visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="private">
              Private — just for me
            </option>
            <option value="public">
              Public — share with everyone
            </option>
          </select>

          <button type="submit" disabled={creating}>
            {creating
              ? "Creating..."
              : "Create collection"}

            {!creating && (
              <span aria-hidden="true"> ↗</span>
            )}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <Link
          to="/dashboard"
          className="dashboard-footer-brand"
        >
          pixcel.
        </Link>

        <span>
          Your photographs. Your space. Your story.
        </span>
      </footer>
    </main>
  );
}

export default Dashboard;
