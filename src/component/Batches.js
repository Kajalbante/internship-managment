import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Batches.css';
import './style/MentorView.css';


const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editBatchesFormData, setEditBatchesFormData] = useState(null);

  const [batchFormData, setBatchFormData] = useState({
    title: '',
    duration: '',
    createdOn: '',
    description: ''
  });

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/batches');
      setBatches(response.data.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)));
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleBatchInputChange = (e) => {
    const { name, value } = e.target;
    setBatchFormData({
      ...batchFormData,
      [name]: value
    });
  };

  const handleEditBatchesInputChange = (e) => {
    const { name, value } = e.target;
    setEditBatchesFormData({
      ...editBatchesFormData,
      [name]: value
    });
  };

  const handleBatchFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/batches', batchFormData);
      setShowBatchForm(false);
      setBatchFormData({
        title: '',
        duration: '',
        createdOn: '',
        description: ''
      });
      fetchBatches();
    } catch (error) {
      console.error('Error adding batch:', error);
    }
  };

  const handleEditBatchFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/batches/${editBatchesFormData.id}`, editBatchesFormData);
      setEditBatchesFormData(null);
      fetchBatches();
    } catch (error) {
      console.error('Error updating Batches:', error);
    }
  };

  const handleDeleteBatches = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/batches/${id}`);
      fetchBatches();
    } catch (error) {
      console.error('Error deleting Batches:', error);
    }
  };  

  return (
    <div className="batches-section">
      <h2>Batches</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Created On</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id}>
              <td>{batch.title}</td>
              <td>{batch.duration}</td>
              <td>{new Date(batch.createdOn).toLocaleDateString()}</td>
              <td>{batch.description}</td>
              <td>
                  <button onClick={() => handleDeleteBatches(batch.id)}>Delete</button>
                </td>
                <td>       
                   <button onClick={() => setEditBatchesFormData(batch)}>Edit</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowBatchForm(true)}>Add Batch</button>

      {showBatchForm && (
        <div className="batch-form">
          <h2>Add Batch</h2>
          <form onSubmit={handleBatchFormSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={batchFormData.title}
              onChange={handleBatchInputChange}
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={batchFormData.duration}
              onChange={handleBatchInputChange}
              required
            />
            <input
              type="date"
              name="createdOn"
              value={batchFormData.createdOn}
              onChange={handleBatchInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={batchFormData.description}
              onChange={handleBatchInputChange}
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}

{editBatchesFormData && (
  <div className="batch-form">
          <h2>Edit Batch</h2>
          <form onSubmit={handleEditBatchFormSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editBatchesFormData.title}
              onChange={handleEditBatchesInputChange}
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={editBatchesFormData.duration}
              onChange={handleEditBatchesInputChange}
              required
            />
            <input
              type="date"
              name="createdOn"
              value={editBatchesFormData.createdOn}
              onChange={handleEditBatchesInputChange}
              
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editBatchesFormData.description}
              onChange={handleEditBatchesInputChange}
              required
            />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditBatchesFormData(null)}>Cancel</button>
         </form>
        </div>
        )}
    </div>
  );
};

export default Batches;
