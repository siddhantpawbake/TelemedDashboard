// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/demoDb';

export default function Home(){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    let mounted = true;
    getCurrentUser().then(u=>{ if(!mounted) return; setUser(u); });
    return ()=>{ mounted = false };
  },[]);

  const name = user?.name || 'Patient';

  return (
    <main className="page-main">
      <div className="page-inner">
        <h1>Good afternoon, {name}</h1>
        <p>Here's your health overview for today</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20,marginTop:20}}>
          <a href="/schemes" className="card" style={{textDecoration:'none',color:'inherit'}}>
            <h4>Health Schemes</h4>
            <p>View government schemes</p>
          </a>
          <div className="card"><h4>Medications</h4><p>3 active</p></div>
          <div className="card"><h4>Insurance</h4><p>HealthSecure</p></div>
          <div className="card"><h4>Recent Records</h4><p>1 new</p></div>
        </div>
      </div>
    </main>
  )
}
