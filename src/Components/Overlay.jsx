import React, { useEffect, useState, useRef } from 'react';
import './Overlay.css';

export default function Overlay({open, title, onClose, children}){
  const [isVisible, setIsVisible] = useState(open);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(()=>{
    if(open) setIsVisible(true);
    else {
      // start exit animation and unmount after it finishes
      if(backdropRef.current) backdropRef.current.classList.add('overlay-exit');
      if(panelRef.current) panelRef.current.classList.add('overlay-exit');
      const t = setTimeout(()=> setIsVisible(false), 200);
      return ()=> clearTimeout(t);
    }
  },[open]);

  if(!isVisible) return null;

  return (
    <div ref={backdropRef} className={`overlay-backdrop ${open ? 'overlay-enter' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
      <div ref={panelRef} className={`overlay-panel ${open ? 'overlay-enter' : ''}`}>
        <div className="overlay-header">
          <h2>{title}</h2>
          <button aria-label="Close" className="overlay-close" onClick={onClose}>✕</button>
        </div>
        <div className="overlay-body">{children}</div>
      </div>
    </div>
  )
}
