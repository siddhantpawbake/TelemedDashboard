// src/pages/Appointments.jsx
import React, { useEffect, useState } from 'react';
import { getAppointments, getCurrentUser } from '../api/demoDb';

export default function Appointments(){
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    let mounted = true;
    getCurrentUser().then(u=>{ if(!mounted) return; setUser(u); });
    getAppointments().then(list=>{ if(!mounted) return; setAppointments(list || []); setLoading(false); });
    return ()=>{ mounted = false };
  },[]);

  const username = user?.name || '';
  // show appointments for the current user if present, otherwise show all
  const visibleUnsorted = username ? appointments.filter(a=>a.patient === username) : appointments;
  // sort by date descending (and time if present)
  const visible = visibleUnsorted.slice().sort((a,b)=>{
    const da = new Date(`${a.date} ${a.time || ''}`);
    const db = new Date(`${b.date} ${b.time || ''}`);
    return db - da;
  });

  return (
    <main style={{padding:24}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <h1>Appointments</h1>
        <p>Upcoming and past appointments</p>
        <div style={{marginTop:16}}>
          {loading ? (
            <div className="card">Loading appointments…</div>
          ) : visible.length === 0 ? (
            <div className="card">No appointments found.</div>
          ) : (
            visible.map(a=> (
              <div key={a.id} className="card" style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div>
                    <strong>{a.type}</strong> — {a.doctor}
                    <div style={{color:'#666'}}>{a.date} {a.time ? ` • ${a.time}` : ''}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div>{a.patient}</div>
                    <div style={{fontSize:12,color:'#888'}}>{a.notes}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
