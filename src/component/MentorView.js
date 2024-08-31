import React, { useState } from 'react';
import Batches from './Batches';
import Interns from './Interns';
import './style/MentorView.css';

const MentorView = () => {
  const [activeView, setActiveView] = useState('batches');

  return (
    <div className="mentor-view">
      <h1>Mentor View</h1>
      <div className="menu">
        <button onClick={() => setActiveView('batches')}>Batches</button>
        <button onClick={() => setActiveView('interns')}>Interns</button>
      </div>
      {activeView === 'batches' && <Batches />}
      {activeView === 'interns' && <Interns />}
    </div>
  );
};

export default MentorView;
