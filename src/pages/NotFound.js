import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page notfound">
      <h2>Page not found</h2>
      <p>We couldn't find that page. Try returning to the <Link to="/">homepage</Link>.</p>
    </div>
  );
}
