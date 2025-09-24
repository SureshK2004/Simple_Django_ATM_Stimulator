import React, { useState } from "react";
import { loginApi } from "../api/atmApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [account, setAccount] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginApi({ account_number: account, pin });
      login(res.data);
      nav("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 480}}>
      <h3>ATM Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Account Number</label>
          <input className="form-control" value={account} onChange={e => setAccount(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>PIN</label>
          <input className="form-control" type="password" value={pin} onChange={e => setPin(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
      <div className="text-muted mt-3">Sample accounts: ACC1001 / 1234  — ACC1002 / 4321</div>
    </div>
  );
}
