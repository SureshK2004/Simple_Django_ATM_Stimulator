import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        
        <Link className="navbar-brand fw-bold text-white" to="/">
           Mini ATM
        </Link>

      
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="text-white me-3 fw-semibold">
                Acc: {user.account_number}
              </span>
              <button
                className="btn btn-outline-light btn-sm rounded-pill px-3"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className="btn btn-light btn-sm rounded-pill px-3 fw-semibold"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
