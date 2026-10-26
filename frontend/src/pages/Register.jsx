
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Registration failed. Please try again."
        );
        return;
      }

      setMessage("Registration successful! You can now sign in.");

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <Link to="/login" className="auth-brand">
        pixcel<span>.</span>
      </Link>

      <section className="auth-card auth-register-card">
        <div className="auth-eyebrow">
          A LITTLE SPACE FOR YOUR ART
        </div>

        <h1>Begin your story.</h1>

        <p className="auth-subtitle">
          Create an account and give your photographs a home.
        </p>

        <div className="auth-divider">
          <span>✳</span>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          <label htmlFor="register-username">Username</label>
          <input
            id="register-username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create your account"}
            {!loading && <span aria-hidden="true"> ↗</span>}
          </button>
        </form>

        {message && (
          <p className="auth-message" role="status">
            {message}
          </p>
        )}

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </section>

      <footer className="auth-footer">
        YOUR PHOTOGRAPHS. YOUR SPACE. YOUR STORY.
      </footer>
    </main>
  );
}

export default Register;
