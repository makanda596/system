import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx'
import SignUpForm from './SignUpForm.jsx'
import LoginForm from './LoginForm.jsx'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
