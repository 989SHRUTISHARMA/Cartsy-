import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const auth = getAuth();

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <div className="forgot-container">

      <div className="forgot-card">

        <h2>Forgot Password</h2>

        <p>
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

      </div>

    </div>
  );
}