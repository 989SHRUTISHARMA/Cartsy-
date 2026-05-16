import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const auth = getAuth();

  const resetPassword = async () => {
    try {

      await sendPasswordResetEmail(auth, email);

      setSuccess("Reset email sent successfully!");

    } catch (error) {

      setSuccess(error.message);

    }
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h2 className="logo">Cartsy</h2>

        <h3>Forgot Password</h3>

        <p className="forgot-subtext">
          Enter your registered email address
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="reset-btn"
          onClick={resetPassword}
        >
          Reset Password
        </button>

        {success && (
          <p className="success-message">
            {success}
          </p>
        )}

      </div>

    </div>
  );
}