import React from 'react';
import { BrowserRouter as  Router,Route, Routes } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import InternView from './component/InternView';
import MentorView from './component/MentorView';
import Login from './component/Login';


function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/intern-view" element={<InternView />} />
    <Route path="/mentor-view" element={< MentorView/>} />
    <Route path="/login-page" element={<Login />} /> 

  </Routes>
  </Router>
  );
}

export default App;
