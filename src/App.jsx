// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Appointments from './pages/Appointments.jsx';
import InsuranceDetails from './Components/InsuranceDetails.jsx';
import Records from './pages/Records.jsx';

function App(){
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* Appointments page removed in favor of Health Schemes. Keep legacy Appointments import if referenced elsewhere. */}
          <Route path="/schemes" element={<InsuranceDetails/>} />
          <Route path="/records" element={<Records/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;