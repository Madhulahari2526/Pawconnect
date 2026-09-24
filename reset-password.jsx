import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authApi } from "./api.js";

export default function ResetPassword() {
  const [params] = useSearchParams(); const navigate = useNavigate(); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setError(""); if (password !== confirm) return setError("Passwords do not match"); setBusy(true);
    try { await authApi.resetPassword({ token: params.get("token"), password }); navigate("/login", { state: { message: "Password reset successful. Please log in." } }); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return <section className="auth-page"><div className="auth-card"><div className="auth-icon">🔑</div><h1>Create New Password</h1><p>Choose a strong password for your account.</p><form onSubmit={submit}><label>New Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength="8" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}" required /><small className="password-hint">At least 8 characters with uppercase, lowercase and a number.</small><label>Confirm Password</label><input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />{error && <p className="form-error">{error}</p>}<button type="submit" disabled={busy}>{busy ? "Updating..." : "Reset Password"}</button></form><p className="auth-footer"><Link to="/login">Back to login</Link></p></div></section>;
}
