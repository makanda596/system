import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx'
import SignUpForm from './SignUpForm.jsx'
import LoginForm from './LoginForm.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Payments from './Pages/Payments.jsx'
import Settings from './Pages/Settings.jsx'
import Alert from './Pages/Alert.jsx';
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import adminlogin from './AdminLogin.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path='/' element={<LoginForm />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/Alert' element={<Alert />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminlogin" element={<Adminlogin />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
