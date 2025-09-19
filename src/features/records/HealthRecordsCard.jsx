// src/features/records/HealthRecordsCard.jsx
import React, { useState, useEffect } from 'react';
import '../shared.css'
import Overlay from '../../Components/Overlay.jsx';
import { getRecords } from '../../api/demoDb';

const HealthRecordsCard = () => {
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(()=>{
    let mounted = true;
    if(open){ getRecords().then(list=>{ if(!mounted) return; setRecords(list || []); }); }
    return ()=>{ mounted = false };
  },[open])

  const last = records.length ? records.slice().sort((a,b)=> new Date(b.date) - new Date(a.date))[0] : null;

  return (
    <>
      <div className="card">
        <h3>Health Records</h3>
        <p>{records.length || 4} Files</p>
        <p>Last: {last ? last.title : '—'}</p>
        <button className="btn primary" onClick={()=>setOpen(true)}>Open</button>
      </div>
      <Overlay open={open} title="Health Records" onClose={()=>setOpen(false)}>
        {records.length === 0 ? <div>No records found.</div> : (
          <div>
            {records.slice().sort((a,b)=> new Date(b.date) - new Date(a.date)).map(r=> (
              <div key={r.id} className="card" style={{marginBottom:10}}>
                <div>
                  <strong>{r.title}</strong>
                  <div style={{color:'#666'}}>{r.date}</div>
                  <div style={{marginTop:8}}>{r.summary}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Overlay>
    </>
  );
};

export default HealthRecordsCard;