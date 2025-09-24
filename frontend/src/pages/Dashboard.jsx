import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      padding: "20px"
    }}>
      <div className="card shadow-lg border-0 rounded-3 p-4 " style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center">
          <h3 className="mb-3 text-primary fw-bold">
            Welcome, {user.account_number}
          </h3>
          <p className="fs-5">
            <strong>Balance:</strong>{" "}
            <span className="text-success">₹{user.balance}</span>
          </p>

          {/* Action Buttons */}
          <div className="row mt-4">
            <div className="col-12 col-md-4 mb-3">
              <Link
                className="btn btn-primary w-100 shadow-sm rounded-pill"
                to="/deposit"
              >
                Deposit
              </Link>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <Link
                className="btn btn-warning w-100 shadow-sm rounded-pill"
                to="/withdraw"
              >
                Withdraw
              </Link>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <Link
                className="btn btn-success w-100 shadow-sm rounded-pill"
                to="/transfer"
              >
                Transfer
              </Link>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-4">
            <Link to="/history" className="btn btn-link text-decoration-none">
               View Last 5 Transactions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}