import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      <div className="login-card">
        <h2 className="logo">Cartsy</h2>

        <h3>Sign-In</h3>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password */}
          <p className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign-In"}
          </button>

        </form>

        {error && <p className="error">{error}</p>}

        <p className="terms">
          By continuing, you agree to Cartsy's Conditions of Use.
        </p>

        <button
          className="create-btn"
          onClick={() => navigate("/signup")}
        >
          Create your Cartsy account
        </button>

      </div>
    </div>
  );
}

export default Login;