import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/InternView.css';

const InternView = () => {
  const [interns, setInterns] = useState([]);
  const [batches, setBatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    email: '',
    city: '',
    contact: ''
  });

  useEffect(() => {
    fetchBatches();
    fetchInterns();
  }, []);

  useEffect(() => {
    if (batches.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        batchId: batches[0].id
      }));
    }
  }, [batches]);

  const fetchBatches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/batches');
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const fetchInterns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/interns');
      setInterns(response.data);
    } catch (error) {
      console.error('Error fetching interns:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/interns', formData);
      setShowForm(false);
      setFormData({
        name: '',
        college: '',
        email: '',
        city: '',
        contact: '',
        remarks: '',
        type: 'Full-time',
        batchId: ''
      });
      fetchInterns();
    } catch (error) {
      console.error('Error adding intern:', error);
    }
  };

  return (
    <div className="intern-view">
      <h1>Intern Profiles</h1>
      <div className="cards-container">
        {interns.length === 0 ? (
          <p>No interns available.</p>
        ) : (
          interns.map((intern) => (
            <div className="card" key={intern.id}>
              <h2>{intern.name}</h2>
              <p>{intern.college}</p>
              <p>{intern.email}</p>
              <p>{intern.city}</p>
              <p>{intern.contact}</p>
            </div>
          ))
        )}
      </div>
      <button onClick={() => setShowForm(true)}>Enroll now</button>

      {showForm && (
        <div className="enroll-form">
          <h2>Enroll Intern</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Save</button>
          </form>
          <button className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default InternView;
