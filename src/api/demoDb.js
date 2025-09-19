// src/api/demoDb.js
// Temporary demo API client. Uses fetch to /api/* endpoints (assumes a server will be attached later).
// If the server is unreachable, falls back to an in-memory demo dataset so the UI still shows data.

const DEMO = {
  overview: { name: 'Siddhant', lastSeen: '2025-09-19' },
  appointments: [
    { id: 1, date: '2025-10-01', time: '10:00', doctor: 'Dr. Lee', type: 'Checkup', patient: 'Siddhant', notes: '' },
    { id: 2, date: '2025-09-10', time: '09:30', doctor: 'Dr. Patel', type: 'Consultation', patient: 'Siddhant', notes: 'Follow-up on bloods' },
    { id: 3, date: '2025-08-02', time: '14:00', doctor: 'Dr. Kumar', type: 'Physiotherapy', patient: 'Siddhant', notes: 'Rehab session 3' },
    { id: 4, date: '2024-12-15', time: '11:00', doctor: 'Dr. Shah', type: 'Dental', patient: 'Siddhant', notes: 'Cavity filled' },
    // another patient example
    { id: 50, date: '2025-09-20', time: '15:00', doctor: 'Dr. Lee', type: 'Checkup', patient: 'Maria', notes: '' }
  ],
  medications: [{ id: 1, name: 'Atorvastatin', dose: '10mg' }],
  insurance: { provider: 'HealthSecure', policy: 'HS-12345' },
  records: [
    { id: 1, title: 'Blood Test', date: '2025-09-01', patient: 'Siddhant', summary: 'Normal hemoglobin. Slightly high cholesterol.' },
    { id: 2, title: 'X-Ray Chest', date: '2024-12-16', patient: 'Siddhant', summary: 'No acute findings.' },
    { id: 3, title: 'ECG', date: '2025-08-02', patient: 'Siddhant', summary: 'Sinus rhythm.' },
    { id: 10, title: 'Dental Record', date: '2024-12-15', patient: 'Siddhant', summary: 'Cavity filled at tooth #14.' }
  ]
  ,
  schemes: [
    { id: 'AB1', name: 'Ayushman Bharat', description: 'Health insurance for economically disadvantaged families, covers secondary and tertiary hospitalization.', active: true, eligibility: 'BPL and identified families', region: 'Nationwide' },
    { id: 'PMJAY', name: 'Pradhan Mantri Jan Arogya Yojana', description: 'Comprehensive health coverage for poor families.', active: true, eligibility: 'Eligible families as per government database', region: 'Statewide' },
    { id: 'JSY', name: 'Janani Suraksha Yojana', description: 'Maternity benefit scheme to promote institutional delivery.', active: true, eligibility: 'Pregnant women meeting criteria', region: 'Statewide' },
    { id: 'OLD', name: 'Old Scheme (inactive)', description: 'An example of inactive scheme', active: false, eligibility: 'N/A', region: 'Nationwide' }
  ]
};

let serverAvailable = true;

async function safeFetch(path, opts){
  if (!serverAvailable) return null;
  try{
    const res = await fetch(`/api/${path}`, opts);
    if(!res.ok) throw new Error('non-ok');
    return await res.json();
  }catch(err){
    // mark server as unavailable to avoid repeated logs
    serverAvailable = false;
    console.info('demoDb: server unreachable, using demo data');
    return null;
  }
}

export async function getOverview(){
  const res = await safeFetch('overview');
  return res || DEMO.overview;
}
export async function getAppointments(){
  const res = await safeFetch('appointments');
  return res || DEMO.appointments;
}
export async function getMedications(){
  const res = await safeFetch('medications');
  return res || DEMO.medications;
}
export async function getInsurance(){
  const res = await safeFetch('insurance');
  return res || DEMO.insurance;
}
export async function getRecords(){
  const res = await safeFetch('records');
  return res || DEMO.records;
}

export async function getSchemes(){
  const res = await safeFetch('schemes');
  return res || DEMO.schemes;
}

// Get currently logged-in user. First attempt to read a serialized user from localStorage
// (key: 'user' or 'patient'), then try server, then fall back to DEMO.overview.
export async function getCurrentUser(){
  // Try common localStorage keys where a client may store the logged-in user
  const keys = ['user', 'patient', 'currentUser', 'profile', 'authUser', 'username', 'name'];
  try{
    for(const k of keys){
      const raw = localStorage.getItem(k);
      if(!raw) continue;
      // If value looks like JSON, parse it
      if(raw.trim().startsWith('{') || raw.trim().startsWith('[')){
        try{
          const parsed = JSON.parse(raw);
          if(parsed && (parsed.name || parsed.username)) return { name: parsed.name || parsed.username };
        }catch(e){ /* ignore parse errors */ }
      }else{
        // plain string (could be just the name)
        return { name: raw };
      }
    }
  }catch(e){ /* localStorage unavailable */ }

  // Try server endpoint if available
  const res = await safeFetch('currentUser');
  return res || DEMO.overview;
}

// POST helper to send data to server (pass-through)
export async function post(path, body){
  try{
    const res = await fetch(`/api/${path}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    return await res.json();
  }catch(err){
    console.warn('demoDb.post failed', err.message);
    return null;
  }
}
