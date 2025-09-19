// src/pages/Dashboard.jsx (updated: added imports for Dashboard.css and shared.css)
import React, {useEffect, useState} from 'react';
import './Dashboard.css';  // New import
import '../features/shared.css';  // New: shared styles for cards
import { getOverview } from '../api/demoDb';
import LastAppointmentCard from '../features/appointment/LastApointmentCard.jsx';
import ActiveMedicationsCard from '../features/medication/ActiveMedicationsCard.jsx';
import InsuranceCard from '../features/insurance/InsuranceCard.jsx';
// InsuranceDetails (government schemes) removed from Dashboard per request

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  useEffect(()=>{
    let mounted = true;
    getOverview().then(d=>{ if(!mounted) return; setOverview(d); });
    return ()=>{ mounted = false };
  },[])
  return (
    <div className="dashboard-container">
      <main className="dashboard-main page-main">
        <header className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <p>Here's your health summary for today.</p>
        </header>
        <div className="page-inner">
        <section className="dashboard-cards">
          <div className="card">
            <h3>Overview</h3>
            <p>Name: {overview?.name}</p>
            <p>Last Seen: {overview?.lastSeen}</p>
          </div>
          <LastAppointmentCard />
          <ActiveMedicationsCard />
          <InsuranceCard />
        </section>
        </div>
        {/* dashboard-bottom removed (schemes were displayed here previously) */}
      </main>
    </div>
  );
};

export default Dashboard;