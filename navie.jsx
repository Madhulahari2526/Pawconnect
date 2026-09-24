import { Link } from "react-router-dom";
import { useAuth } from "./auth.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🐾 PawConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pets">Find Pets</Link>
        {user && <Link to="/post-pet">Post a Pet</Link>}
        <Link to="/favorites">❤️ Favorites</Link>
        {user ? <><span>Hello, {user.name}</span><button className="nav-button" onClick={logout}>Logout</button></> : <><Link to="/login">Login</Link><Link to="/register" className="nav-button">Register</Link></>}
      </div>
    </nav>
  );
}

export default Navbar;