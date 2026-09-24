import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./auth.jsx";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setBusy(true);
    try {
      if (e.target.password.value !== e.target.confirmPassword.value) throw new Error("Passwords do not match");
      const result = await register({ name: e.target.name.value, email: e.target.email.value, phone: e.target.phone.value, password: e.target.password.value });
      setSuccess(result.emailSent ? "Registration successful. Check your email for confirmation." : "Registration successful. Email confirmation is not configured yet.");
      setTimeout(() => navigate("/pets"), 1800);
    }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🐶</div>

        <h1>Create Account</h1>

        <p>
          Join PawConnect and help pets find
          loving homes.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>

          <input
            name="name" type="text"
            placeholder="Enter your name"
            required
          />

          <label>Email</label>

          <input
            name="email" type="email"
            placeholder="Enter your email"
            required
          />

          <label>Phone Number</label>
          <input name="phone" type="tel" placeholder="+1 555 123 4567" pattern="^\+?[1-9][0-9 ()-]{7,14}$" required />

          <label>Password</label>

          <input
            name="password" type="password" minLength="8"
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
            placeholder="Create a password"
            required
          />
          <small className="password-hint">Use at least 8 characters with uppercase, lowercase and a number.</small>

          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" placeholder="Confirm your password" required />

          {error && <p className="form-error">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" disabled={busy}>
            {busy ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;