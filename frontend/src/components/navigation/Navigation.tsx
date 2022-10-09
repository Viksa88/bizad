import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Navigation = () => {
  const { isAuthenticated, setAuthenticatedStatus } = useContext(AuthContext);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setAuthenticatedStatus(false);
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-2 d-flex align-items-center justify-content-between">
      <div className="d-flex gap-4 mt-2">
        <i className="bi bi-shop text-light"></i>

        {isAuthenticated && (
          <>
            <Link className="text-light text-decoration-none" to="">
              <p>BizAd</p>
            </Link>
            <Link className="text-light text-decoration-none" to="/services">
              <p>Services</p>
            </Link>

            <Link className="text-light text-decoration-none" to="/about">
              <p>About</p>
            </Link>
          </>
        )}
      </div>

      <div className="d-flex gap-4 mt-2">
        {!isAuthenticated ? (
          <>
            <Link className="text-light text-decoration-none" to="/register">
              <p>Sign up</p>
            </Link>
            <Link className="text-light text-decoration-none" to="/login">
              <p>Login</p>
            </Link>
          </>
        ) : (
          <p
            onClick={handleLogoutClick}
            className="text-light text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            Logout
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
