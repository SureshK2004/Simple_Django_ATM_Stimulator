import React, { useEffect, useState } from "react";
import { historyApi } from "../api/atmApi";
import { useAuth } from "../context/AuthContext";

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await historyApi(user.account_number);
        setHistory(res.data || []);
      } catch (err) {
        setMsg("Could not load history");
      }
    }
    load();
  }, [user.account_number]);

  return (
    <div className="container mt-5">
      <h4>Last 5 Transactions</h4>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <table className="table">
        <thead>
          <tr><th>Time</th><th>Type</th><th>Amount</th><th>Target</th></tr>
        </thead>
        <tbody>
          {history.length === 0 && <tr><td colSpan="4">No transactions yet.</td></tr>}
          {history.map((t, i) => (
            <tr key={i}>
              <td>{new Date(t.timestamp).toLocaleString()}</td>
              <td>{t.type}</td>
              <td>Rs{t.amount}</td>
              <td>{t.target_account || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
