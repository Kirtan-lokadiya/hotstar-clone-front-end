import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Header = () => {
  const [auth, setAuth] = useState("");
  const [username, setUsername] = useState("");

  const logout = () => {
    localStorage.clear();
    setAuth("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setAuth(token);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ backgroundColor: "#040714" }}
      >
        <Link className="navbar-brand text-light" to="/">
          Disney-Hotstar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link text-light" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/category/tv_shows">
                TV_shows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/category/sports">
                Sports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/category/movies">
                Movies
              </Link>
            </li>
          </ul>
          <Link className="nav-link text-light" to="/search">
                Search </Link>
          <div className="form-inline my-2 my-lg-0">
            {auth ? (
              <>
                <Link
                  className="btn btn-primary mx-1 "
                  to="/signup"
                  type="submit"
                  onClick={logout}
                >
                  logout
                </Link>
                <p  style={{ color: "#FFFFFF" ,margin:"auto"}}>Hello {username}</p>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  type="submit"
                >
                  Signup
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  type="submit"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div></div>
    </div>
  );
};

export default Header;
