import React, { useState } from "react";
import Users from "./users";
import Products from "./products";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="main-content">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="info">
            <h3>Total Users</h3>
            <h2>1,234</h2>
          </div>
          <div className="icon">👥</div>
        </div>
        <div className="dashboard-card">
          <div className="info">
            <h3>New Orders</h3>
            <h2>56</h2>
          </div>
          <div className="icon">📦</div>
        </div>
        <div className="dashboard-card">
          <div className="info">
            <h3>Revenue</h3>
            <h2>$12,340</h2>
          </div>
          <div className="icon">💰</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
