import React from "react";

export default function Emergency() {
  return (
    <div className="page emergency-page">
      <h2>Emergency Contacts</h2>
      <div className="emergency-cards">
        <div className="em-card">
          <h3>Ambulance</h3>
          <p>Call: <strong>995</strong> or +267 391 0000</p>
        </div>
        <div className="em-card">
          <h3>Poison Control</h3>
          <p>Call: +267 391 1111</p>
        </div>
      </div>
      <p>If this is a life-threatening emergency, call the ambulance immediately.</p>
    </div>
  );
}
