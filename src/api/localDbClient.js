// src/api/localDbClient.js
// Reads data from attached JSON in localStorage or falls back to bundled offlineDb.json

import offlineDb from '../db/offlineDb.json';

const STORAGE_KEY = 'grok_local_db';

function loadAttached() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('localDbClient: failed to parse attached DB', err.message);
    return null;
  }
}

export function attachDbFromObject(obj){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    return true;
  }catch(err){
    console.error('attachDbFromObject failed', err);
    return false;
  }
}

export function detachDb(){
  localStorage.removeItem(STORAGE_KEY);
}

function getDb(){
  const attached = loadAttached();
  return attached || offlineDb;
}

export function getOverview(){
  const db = getDb();
  return db.overview || null;
}
export function getAppointments(){
  const db = getDb();
  return db.appointments || [];
}
export function getMedications(){
  const db = getDb();
  return db.medications || [];
}
export function getInsurance(){
  const db = getDb();
  return db.insurance || {};
}
export function getRecords(){
  const db = getDb();
  return db.records || [];
}
