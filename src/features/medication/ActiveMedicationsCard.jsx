// src/features/medication/ActiveMedicationsCard.jsx
import React, { useState, useEffect } from 'react';
import '../shared.css'
import Overlay from '../../Components/Overlay.jsx';
import { getMedications } from '../../api/demoDb';

const ActiveMedicationsCard = () => {
  const [open, setOpen] = useState(false);
  const [meds, setMeds] = useState([]);

  useEffect(()=>{
    let mounted = true;
    if(open){ getMedications().then(list=>{ if(!mounted) return; setMeds(list || []); }); }
    return ()=>{ mounted = false };
  },[open])

  return (
    <>
      <div className="card">
        <h3>Active Medications</h3>
        <p>{meds.length || 2} Meds</p>
        <p>Atorvastatin,</p>
        <p>Metformin</p>
        <button className="btn primary" onClick={()=>setOpen(true)}>Manage</button>
      </div>
      <Overlay open={open} title="Active Medications" onClose={()=>setOpen(false)}>
        {meds.length === 0 ? <div>No medications found.</div> : (
          <ul>
            {meds.map(m=> <li key={m.id}><strong>{m.name}</strong> — {m.dose}</li>)}
          </ul>
        )}
      </Overlay>
    </>
  );
};

export default ActiveMedicationsCard;