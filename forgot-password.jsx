import { Link } from "react-router-dom";
import { useState } from "react";
import { authApi } from "./api.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const result = await authApi.forgotPassword({ email });
      if (result.demo) {
        setMessage("Demo reset link created. Open it below to create your new password.");
      } else {
        setMessage("If an account exists for that email, a password reset link has been sent.");
      }
    }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <section className="auth-page"><div className="auth-card"><div className="auth-icon">🔐</div><h1>Forgot Password?</h1><p>Enter your email and we’ll create a secure reset link.</p><form onSubmit={submit}><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />{error && <p className="form-error">{error}</p>}{message && <p className="success-message">{message}</p>}{message && <Link className="hero-button" to="/reset-password?token=demo-reset-token">Create New Password</Link>}<button type="submit" disabled={busy}>{busy ? "Creating..." : "Create Reset Link"}</button></form><p className="auth-footer"><Link to="/login">Back to login</Link></p></div></section>;
}
