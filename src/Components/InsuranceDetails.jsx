// src/components/InsuranceDetails.jsx
import React, { useEffect, useState, useMemo } from 'react';
import './InsuranceDetails.css';
import { getSchemes } from '../api/demoDb';
import Overlay from './Overlay.jsx';

const InsuranceDetails = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // UI state
  const [search, setSearch] = useState('');
  const [activeOnly, setActiveOnly] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(()=>{
    let mounted = true;
    getSchemes().then(list=>{ if(!mounted) return; setSchemes(list || []); setLoading(false); });
    return ()=>{ mounted = false };
  },[]);

  const regions = useMemo(()=>{
    const setR = new Set();
    schemes.forEach(s=> setR.add(s.region || 'Nationwide'));
    return Array.from(setR);
  },[schemes]);

  const normalizedQuery = search.trim().toLowerCase();
  const filtered = schemes.filter(s=>{
    if(activeOnly && !s.active) return false;
    const r = s.region || 'Nationwide';
    if(selectedRegion !== 'All' && r !== selectedRegion) return false;
    if(!normalizedQuery) return true;
    return (s.name || '').toLowerCase().includes(normalizedQuery)
      || (s.description || '').toLowerCase().includes(normalizedQuery)
      || (s.eligibility || '').toLowerCase().includes(normalizedQuery);
  });

  function openOverlayFor(s, e){
    if(e) e.stopPropagation();
    setActive(s);
    setOpen(true);
  }

  return (
    <div className="insurance-details">
      <h2>Government Health Schemes</h2>

      <div className="schemes-controls">
        <input aria-label="Search schemes" className="schemes-search" placeholder="Search schemes by name or eligibility..." value={search} onChange={e=>setSearch(e.target.value)} />
        <label className="filter-active"><input type="checkbox" checked={activeOnly} onChange={e=>setActiveOnly(e.target.checked)} /> Active only</label>
      </div>

      <div className="region-chips">
        <button className={`chip ${selectedRegion==='All' ? 'selected' : ''}`} onClick={()=>setSelectedRegion('All')}>All</button>
        {regions.map(r=> (
          <button key={r} className={`chip ${selectedRegion===r ? 'selected' : ''}`} onClick={()=>setSelectedRegion(r)}>{r}</button>
        ))}
      </div>

      {loading ? <div>Loading schemes…</div> : (
        <div className="list-scroll">
          <ul>
            {filtered.map(s=> (
              <li key={s.id} className={`scheme-card ${expandedId===s.id ? 'expanded' : ''}`}>
                <div className="scheme-main" onClick={()=>setExpandedId(expandedId===s.id ? null : s.id)}>
                  <div className="scheme-info">
                    <strong>{s.name}</strong>
                    <div className="scheme-meta">{s.region || 'Nationwide'}</div>
                  </div>
                  <div className="actions">
                    <span className={`badge ${s.active ? 'active' : 'inactive'}`}>{s.active ? 'Active' : 'Inactive'}</span>
                    <button className="link-btn" onClick={(e)=>openOverlayFor(s,e)}>View</button>
                  </div>
                </div>

                <div className="expanded-content" aria-hidden={expandedId!==s.id}>
                  <p className="brief">{s.description}</p>
                  <p className="brief"><strong>Eligibility:</strong> {s.eligibility}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Overlay open={open} title={active ? active.name : 'Scheme Details'} onClose={()=>setOpen(false)}>
        {active ? (
          <div>
            <p><strong>Description:</strong> {active.description}</p>
            <p><strong>Eligibility:</strong> {active.eligibility}</p>
            <p><strong>Status:</strong> {active.active ? 'Active' : 'Inactive'}</p>
          </div>
        ) : <div>No scheme selected.</div>}
      </Overlay>
    </div>
  );
};

export default InsuranceDetails;