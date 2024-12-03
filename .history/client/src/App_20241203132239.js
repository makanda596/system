import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx'
import SignUpForm from './SignUpForm.jsx'
import LoginForm from './LoginForm.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Payments from './Pages/Payments.jsx'
import Settingsfrom './Pages/Settings.jsx'

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
