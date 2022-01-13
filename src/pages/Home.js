import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link to="/event/1">Event Details</Link>
    </div>
  );
}
