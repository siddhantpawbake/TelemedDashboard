// src/pages/Records.jsx
import React, { useEffect, useState } from 'react';
import { getRecords, getCurrentUser } from '../api/demoDb';

export default function Records(){
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    let mounted = true;
    getCurrentUser().then(u=>{ if(!mounted) return; setUser(u); });
    getRecords().then(list=>{ if(!mounted) return; setRecords(list || []); setLoading(false); });
    return ()=>{ mounted = false };
  },[]);

  const username = user?.name || '';
  const visibleUnsorted = username ? records.filter(r=>r.patient === username) : records;
  const visible = visibleUnsorted.slice().sort((a,b)=> new Date(b.date) - new Date(a.date));

  return (
    <main style={{padding:24}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <h1>Health Records</h1>
        <p>Medical records and summaries</p>
        <div style={{marginTop:16}}>
          {loading ? (
            <div className="card">Loading records…</div>
          ) : visible.length === 0 ? (
            <div className="card">No records found.</div>
          ) : (
            visible.map(r=> (
              <div key={r.id} className="card" style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div>
                    <strong>{r.title}</strong>
                    <div style={{color:'#666'}}>{r.date}</div>
                    <div style={{marginTop:8}}>{r.summary}</div>
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
