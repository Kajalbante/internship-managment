import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Interns.css';

const Interns = () => {
  const [batches, setBatches] = useState([]);
  const [interns, setInterns] = useState([]);
  const [showInternForm, setShowInternForm] = useState(false);
  const [editInternFormData, setEditInternFormData] = useState(null);

  const [internFormData, setInternFormData] = useState({
    name: '',
    college: '',
    email: '',
    city: '',
    contact: '',
    remarks: '',
    type: 'Full-time',
    batchId: ''
  });

  useEffect(() => {
    fetchBatches();
    fetchInterns();
  }, []);

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

  const handleInternInputChange = (e) => {
    const { name, value } = e.target;
    setInternFormData({
      ...internFormData,
      [name]: value
    });
  };

  const handleEditInternInputChange = (e) => {
    const { name, value } = e.target;
    setEditInternFormData({
      ...editInternFormData,
      [name]: value
    });
  };

  const handleInternFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/interns', internFormData);
      setShowInternForm(false);
      setInternFormData({
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

  const handleEditInternFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/interns/${editInternFormData.id}`, editInternFormData);
      setEditInternFormData(null);
      fetchInterns();
    } catch (error) {
      console.error('Error updating intern:', error);
    }
  };


  const handleDeleteIntern = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/interns/${id}`);
      fetchInterns();
    } catch (error) {
      console.error('Error deleting intern:', error);
    }
  };

  return (
    <div className="interns-section">
      <h2>Interns</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>College</th>
            <th>Email</th>
            <th>City</th>
            <th>Contact</th>
            <th>Remarks</th>
            <th>Type</th>
            <th>Batch</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => {
            const batch = batches.find((b) => b.id === intern.batchId);
            const batchTitle = batch ? batch.title : 'No Batch';
            return (           
               <tr key={intern.id}>
              <td>{intern.name}</td>
              <td>{intern.college}</td>
              <td>{intern.email}</td>
              <td>{intern.city}</td>
              <td>{intern.contact}</td>
              <td>{intern.remarks}
              </td>
              <td>
              {intern.type}
              </td>
              <td>{batchTitle}</td>

              <td>
                  <button onClick={() => handleDeleteIntern(intern.id)}>Delete</button>
                </td>
              <td>       
                  <button onClick={() => setEditInternFormData(intern)}>Edit</button>
              </td>
            </tr>
            );
})}
        </tbody>
      </table>
      <button onClick={() => setShowInternForm(true)}>Add Intern</button>

      {showInternForm && (
        <div className="intern-form">
          <h2>Add Intern</h2>
          <form onSubmit={handleInternFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={internFormData.name}
              onChange={handleInternInputChange}
              required
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={internFormData.college}
              onChange={handleInternInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={internFormData.email}
              onChange={handleInternInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={internFormData.city}
              onChange={handleInternInputChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={internFormData.contact}
              onChange={handleInternInputChange}
              required
            />
            <input
              type="text"
              name="remarks"
              placeholder="Remarks"
              value={internFormData.remarks}
              onChange={handleInternInputChange}
            />
            <select
              name="type"
              value={internFormData.type}
              onChange={handleInternInputChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
            <select
              name="batchId"
              value={internFormData.batchId}
              onChange={handleInternInputChange}
              required
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.title}
                </option>
              ))}
            </select>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Interns11;
