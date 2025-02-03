import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/dashboard.css';
import { decodeToken } from './Login';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  
  let userRole = null;
  if (token) {
    const decodedToken = decodeToken(token);
    userRole = decodedToken?.role; // Extract role from the token
  }

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [token, navigate]);

  const handleNavigation = (path, requiredRole) => {
    if (userRole !== requiredRole) {
      alert(`Access Denied! You need ${requiredRole} privileges.`);
      return;
    }
    navigate(path);
  };
  return (
    <div className="dashboard-container">
      <h1>Welcome to AD Blogs Dashboard</h1>
      <div className="dashboard-cards">
        <div 
          className="dashboard-card"
          onClick={() => navigate('/author')}
        >
          <div className="card-icon">✍️</div>
          <h2>Author Dashboard</h2>
          <p>Create and manage your blog posts</p>
        </div>

        <div 
          className="dashboard-card"
          onClick={() => navigate('/admin')}
        >
          <div className="card-icon">👑</div>
          <h2>Admin Dashboard</h2>
          <p>Manage comments and user permissions</p>
        </div>

        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/home')}
        >
          <div className="card-icon">🏠</div>
          <h2>Home</h2>
          <p>View all blog posts</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;