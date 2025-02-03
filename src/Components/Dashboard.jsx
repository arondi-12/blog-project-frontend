import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/dashboard.css';
import { decodeToken } from './Login';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  let userRole = null;
  if (token) {
    const decodedToken = decodeToken(token);
    userRole = decodedToken?.role;
  }

  useEffect(() => {
    if (!token) {
      navigate('/login'); 
    }
  }, [token, navigate]);

  const handleNavigation = (path, requiredRole) => {
    if (!token) {
      navigate('/login'); 
    } else if (userRole === requiredRole) {
      navigate(path); 
    } else {
      alert(`Access Denied! You need ${requiredRole} privileges.`);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to AD Blogs Dashboard</h1>
      <div className="dashboard-cards">
        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/author', 'author')}
        >
          <div className="card-icon">✍️</div>
          <h2>Author Dashboard</h2>
          <p>Create and manage your blog posts</p>
        </div>

        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/admin', 'admin')}
        >
          <div className="card-icon">👑</div>
          <h2>Admin Dashboard</h2>
          <p>Manage comments and user permissions</p>
        </div>

        <div 
          className="dashboard-card"
          onClick={() => navigate('/home')} 
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
