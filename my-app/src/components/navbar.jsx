import react, { useState, useEffect } from "react";

import { Navigate, Link } from "react-router-dom";
import "../pages/style/navbar.css";

function NavBar() {
  const [profile, setProfile] = useState("Login");

  useEffect(() => {
    if (localStorage.getItem("AlphaQ")) {
      setProfile(JSON.parse(localStorage.getItem("AlphaQ")));
      console.log(profile);
    }
  }, [localStorage.getItem("AlphaQ")]);

  return (
    <nav className="navbar">
      <div className="containerNav">
        <div className="logo">
        <Link to="/">
          <a>Movie Buff</a>
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">
                <a>Home</a>
            </Link>
          </li>
          <li>
          <Link to="/movies">
            <a>Movies</a>
            </Link>
          </li>
          <li>
          <Link to="/tv">
            <a href="#">TV Shows</a>
          </Link>
          </li>
          <li>
          <Link to="/">
            <a>Favorites</a>
            </Link>
          </li>
        </ul>
        <div className="profile">
          <Link to="/profile">
            <a>{profile.username}</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
