import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./auth.jsx";

function Login() {
  const { login, requestPhoneOtp, verifyPhoneOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [phoneMode, setPhoneMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpHint, setOtpHint] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setBusy(true);
    try { await login({ email: e.target.email.value, password: e.target.password.value }); navigate("/pets"); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      const phone = e.target.phone.value;
      if (!otpSent) {
        const result = await requestPhoneOtp(phone);
        setOtpSent(true);
        setOtpHint(result.demoOtp ? `Your demo OTP is ${result.demoOtp}` : result.message);
      } else {
        await verifyPhoneOtp(phone, e.target.otp.value);
        navigate("/pets");
      }
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🐾</div>

        <h1>Welcome Back</h1>

        <p>Login to continue your adoption journey.</p>
        {location.state?.message && <p className="success-message">{location.state.message}</p>}

        {!phoneMode ? <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input name="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <input name="password"
            type="password"
            placeholder="Enter your password"
            required
          />

          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={busy}>
            {busy ? "Logging in..." : "Login"}
          </button>
        </form> : <form onSubmit={handlePhoneSubmit}>
          <label>Phone number</label>
          <input name="phone" type="tel" pattern="^\+?[1-9][0-9 ()-]{7,14}$" placeholder="+91 98765 43210" required />
          {otpSent && <><label>OTP</label><input name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" placeholder="Enter 6-digit OTP" required /></>}
          {otpHint && <p className="success-message">{otpHint}</p>}
          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? "Please wait..." : otpSent ? "Verify OTP" : "Get OTP"}</button>
        </form>}
        <button type="button" className="text-button" onClick={() => { setPhoneMode(!phoneMode); setOtpSent(false); setError(""); setOtpHint(""); }}>
          {phoneMode ? "Login with email and password" : "Login with phone OTP"}
        </button>

        <p className="auth-footer">
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;