import React, { useState } from "react";
import { depositApi } from "../api/atmApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Deposit() {
  const { user, login } = useAuth();
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await depositApi({ account_number: user.account_number, amount });
      login(res.data);
      setMsg("Deposit successful");
      setAmount("");
      setTimeout(() => nav("/"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || "Error while depositing");
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 480}}>
      <h4>Deposit</h4>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Amount</label>
          <input className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <button className="btn btn-success">Deposit</button>
      </form>
    </div>
  );
}
