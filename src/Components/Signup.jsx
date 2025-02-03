import { useState } from 'react';
import '../Styles/Signup.css'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
  
      console.log('Signup form submitted:', formData);
      console.log('Response:', response);
      
      const data = await response.json();
      console.log('Data:', data);
  
      if (response.status === 201) {
        console.log('User created successfully');
        alert('User created successfully');
        navigate('/login');
      } else {
        console.log('User creation failed');
        alert('User creation failed');
        setLoading(false);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.log('An error occurred:', error);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            value={formData.username}
            onChange={handleChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="role-select-container">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>ROLE</option>
              <option value="admin">ADMIN</option>
              <option value="author">AUTHOR</option>
              <option value="user">USER</option>
            </select>
          </div>

          
          <button type="submit" className="create-user-btn">
            {loading ? 'loading...' : 'Create Account'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;