import { Link } from "react-router-dom";
import '../Styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container" > 
      <nav className="navbar">
        <div className="logo">AD Blogs</div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Log in</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1>Publish your passions, your way</h1>
          <h2>Create a unique and beautiful blog easily.</h2>
          <Link to="/home" className="get-started-btn">Get Started</Link>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;