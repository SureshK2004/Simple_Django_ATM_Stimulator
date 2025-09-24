import React, { useState } from "react";
import { transferApi } from "../api/atmApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Transfer() {
  const { user, login } = useAuth();
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await transferApi({ from_account: user.account_number, to_account: toAccount, amount });
      login(res.data); 
      setMsg("Transfer successful");
      setToAccount(""); setAmount("");
      setTimeout(() => nav("/"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || "Error while transferring");
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 480}}>
      <h4>Transfer</h4>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>To Account Number</label>
          <input className="form-control" value={toAccount} onChange={e => setToAccount(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Amount</label>
          <input className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Transfer</button>
      </form>
    </div>
  );
}
