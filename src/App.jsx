import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import HomePage from './Components/Homepage';
import AdminDashboard from './Components/Admindashboard';
import AuthorDashboard from './Components/Authordashboard';
import Dashboard from './Components/Dashboard';
import './App.css';

// Auth check functions
const isAdmin = () => localStorage.getItem('user_role') === 'admin';
const isAuthor = () => localStorage.getItem('user_role') === 'author';

// Protected Route components
const ProtectedAdminRoute = () => (isAdmin() ? <Outlet /> : <Navigate to="/login" replace />);
const ProtectedAuthorRoute = () => (isAuthor() ? <Outlet /> : <Navigate to="/login" replace />);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Protected Admin Route */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Protected Author Route */}
      <Route element={<ProtectedAuthorRoute />}>
        <Route path="/author" element={<AuthorDashboard />} />
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;