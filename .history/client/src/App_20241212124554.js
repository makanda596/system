import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home.jsx';
import SignUpForm from './SignUpForm.jsx';
import LoginForm from './LoginForm.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Payments from './Pages/Payments.jsx';
import Settings from './Pages/Settings.jsx';
import Alert from './Pages/Alert.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import Adminlogin from './Adminlogin.jsx';
import Forgotpassword from './Pages/Forgotpassword.jsx';
import EmailVerification from './Pages/EmailVerificationPage.jsx';
import Resetpassword from './Pages/Resetpassword.jsx';
import AdminAlertPage from './Pages/AdminAlertPage.jsx'
import { useAuthStore } from '../src/store/authStore.js';

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  // Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show a loading spinner or placeholder while checking authentication
  if (isCheckingAuth) return <h1>loading ...</h1>


  return (
    <div>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpForm />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/"
            element={
              <RedirectAuthenticatedUser>
                <LoginForm />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/forgotpassword" element={
            <RedirectAuthenticatedUser>
              <Forgotpassword />
            </RedirectAuthenticatedUser>} />

          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <Resetpassword />
            </RedirectAuthenticatedUser>
          } />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alert"
            element={
              <ProtectedRoute>
                <Alert />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="adminalert" element={<AdminAlertPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
