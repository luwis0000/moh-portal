import React from "react";
import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div className="page">
      <h2>Admin Dashboard (Demo)</h2>
      <div className="card-container">
        <Card title="User Feedback" text="12 new feedback messages this month." />
        <Card title="Service Requests" text="Most requests are for maternal health services." />
      </div>
      <p>Integrate real analytics (Chart.js) here for full implementation.</p>
    </div>
  );
}
