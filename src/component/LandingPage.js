import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleInternLogin = () => {
    navigate('/login-page');
  };

  const handleMentorLogin = () => {
    navigate('/login-page'); 
  };

  return (
    <div className="landing-page">
      <button className="login-button intern-button" onClick={handleInternLogin}>
        Intern Login
      </button>
      <button className="login-button mentor-button" onClick={handleMentorLogin}>
        Mentor Login
      </button>
    </div>
  );
};

export default LandingPage;
