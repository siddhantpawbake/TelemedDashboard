// src/features/appointment/LastAppointmentCard.jsx
import React, { useState, useEffect } from 'react';
import Overlay from '../../Components/Overlay.jsx';
import { getAppointments } from '../../api/demoDb';

const LastAppointmentCard = () => {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(()=>{
    let mounted = true;
    if(open){
      getAppointments().then(list=>{ if(!mounted) return; setAppointments(list || []); });
    }
    return ()=>{ mounted = false };
  },[open])

  const last = appointments.length ? appointments.slice().sort((a,b)=> new Date(b.date) - new Date(a.date))[0] : null;

  return (
    <>
      <div className="card">
        <h3>Last Appointment</h3>
        <p>{last ? `${last.doctor}` : '—'}</p>
        <p>{last ? `${last.date}` : '—'}</p>
        <button className="btn primary" onClick={()=>setOpen(true)}>View</button>
      </div>
      <Overlay open={open} title="All Appointments" onClose={()=>setOpen(false)}>
        {appointments.length === 0 ? <div>No appointments found.</div> : (
          <div>
            {appointments.slice().sort((a,b)=> new Date(b.date) - new Date(a.date)).map(a=> (
              <div key={a.id} className="card" style={{marginBottom:10}}>
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
            ))}
          </div>
        )}
      </Overlay>
    </>
  );
};

export default LastAppointmentCard;