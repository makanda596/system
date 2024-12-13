import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home.jsx'
import SignUpForm from './SignUpForm.jsx'
import LoginForm from './LoginForm.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Payments from './Pages/Payments.jsx'
import Settings from './Pages/Settings.jsx'
import Alert from './Pages/Alert.jsx';
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import Adminlogin from './Adminlogin.jsx';
import Forgotpassword from './Pages/Forgotpassword.jsx';
import EmailVerification from './Pages/EmailVerificationPage.jsx';
import ResetPassword from './Pages/Resetpassword.jsx';
import { useAuthStore } from '../src/store/authStore.js'

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/home' replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

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
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/email-verirification" element={<EmailVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
