import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import HomePage from './Components/Homepage';
import AdminDashboard from './Components/Admindashboard';
import AuthorDashboard from './Components/Authordashboard';
import Dashboard from './Components/Dashboard';
import './App.css';


const isAdmin = () => {
  return localStorage.getItem('userRole') === 'admin';
};

const isAuthor = () => {
  return localStorage.getItem('userRole') === 'author';
};


const ProtectedAdminRoute = (children) => {
  if (!isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedAuthorRoute = (children) => {
  if (!isAuthor()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/author" element={<AuthorDashboard />} />

        
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />

        
        <Route 
          path="/author" 
          element={
            <ProtectedAuthorRoute>
              <AuthorDashboard />
            </ProtectedAuthorRoute>
          } 
        />
     
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;