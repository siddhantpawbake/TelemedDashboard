// src/components/RecentActivity.jsx
import React from 'react';
import './RecentActivity.css';
const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <ul>
        <li>
          <p>Consultation - Dr. Lee</p>
          <p className="activity-date">10 Aug 2025 — Follow up on cholesterol</p>
        </li>
      </ul>
    </div>
  );
};

export default RecentActivity;