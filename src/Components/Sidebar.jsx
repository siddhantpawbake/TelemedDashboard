// src/components/Sidebar.jsx (updated: added import)
import React from 'react';
import './Sidebar.css';  // New import

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className="active">Overview</li>
          <li>Appointments</li>
          <li>Medications</li>
          <li>Insurance</li>
          <li>Records</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;