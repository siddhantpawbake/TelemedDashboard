// src/features/insurance/InsuranceCard.jsx
import React, { useState, useEffect } from 'react';
import Overlay from '../../Components/Overlay.jsx';
import { getInsurance } from '../../api/demoDb';

const InsuranceCard = () => {
  const [open, setOpen] = useState(false);
  const [ins, setIns] = useState(null);

  useEffect(()=>{
    let mounted = true;
    if(open){ getInsurance().then(i=>{ if(!mounted) return; setIns(i || null); }); }
    return ()=>{ mounted = false };
  },[open])

  return (
    <>
      <div className="card">
        <h3>Insurance</h3>
        <p>{ins ? 'Active' : 'Active'}</p>
        <p>Expiry: 31 Dec 2025</p>
        <button className="btn primary" onClick={()=>setOpen(true)}>View Policy</button>
      </div>
      <Overlay open={open} title="Insurance Policy" onClose={()=>setOpen(false)}>
        {ins ? (
          <div>
            <div><strong>Provider:</strong> {ins.provider}</div>
            <div><strong>Policy:</strong> {ins.policy}</div>
          </div>
        ) : (
          <div>Loading insurance...</div>
        )}
      </Overlay>
    </>
  );
};

export default InsuranceCard;