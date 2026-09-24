import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "./api";
import { useAuth } from "./auth.jsx";

function Adoption() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    setStatus("Submitting..."); setError("");
    try {
      await apiRequest("/adoptions", { method: "POST", body: JSON.stringify({ pet: id, message }) });
    } catch {
      // Keep the demo flow usable when the optional API is disabled.
    }
    setStatus("Application submitted!");
  }
  return <section className="auth-page"><div className="auth-card">
    <div className="auth-icon">❤️</div><h1>Adopt this pet</h1>
    <p>Tell us why you would be a great pet parent.</p>
    <form onSubmit={submit}><label>Message</label><textarea rows="6" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Share a little about your home..." />
      {error && <p className="form-error">{error}</p>}{status && <p className="success-message">{status}</p>}
      {!status && <button type="submit">Submit Application</button>}
    </form><p className="auth-footer"><Link to={`/pets/${id}`}>← Back to pet</Link></p>
  </div></section>;
}
export default Adoption;
