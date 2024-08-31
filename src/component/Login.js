import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Hardcoded credentials
  const internEmail = 'intern@gmail.com';
  const internPassword = 'intern';

  const mentorEmail = 'mentor@gmail.com';
  const mentorPassword = 'mentor';

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate credentials
    if (email === internEmail && password === internPassword) {
      navigate('/intern-view');
    } 
    else if(email === mentorEmail && password === mentorPassword) 
        { 
            navigate('/mentor-view');
         }    
     else {
      alert('Incorrect username or password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
