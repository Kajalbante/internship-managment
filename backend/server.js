const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');


// Initialize the app and middleware
const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_database'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes
// Fetch all batches
app.get('/api/batches', (req, res) => {
  const sql = 'SELECT * FROM batches ORDER BY createdOn DESC';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching batches' });
    }
    res.json(results);
  });
});

// Fetch all interns
app.get('/api/interns', (req, res) => {
  const sql = 'SELECT * FROM interns';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching interns' });
    }
      res.json(results);
  });
});

// Fetch the latest batch
app.get('/api/latest-batch', (req, res) => {
  const sql = 'SELECT * FROM batches ORDER BY createdOn DESC LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching latest batch' });
    }
    res.json(results[0]);
  });
});

// Add a new batch
app.post('/api/batches', (req, res) => {
  const { title, duration, createdOn, description } = req.body;
  const sql = 'INSERT INTO batches (title, duration, createdOn, description) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, duration, createdOn, description], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding batch' });
    }
    res.status(201).json({ id: results.insertId, title, duration, createdOn, description });
  });
});

// Add a new intern
app.post('/api/interns', (req, res) => {
  const { name, college, email, city, contact, remarks, type,batchId } = req.body;
  const sql = 'INSERT INTO interns (name, college, email, city, contact, remarks, type , batchId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, college, email, city, contact, remarks, type,batchId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding intern' });
    }
    res.status(201).json({ id: results.insertId, name, college, email, city, contact, remarks, type });
  });
});


// Fetch a specific intern by ID
app.get('/api/interns/:id', (req, res) => {
  const sql = 'SELECT * FROM interns WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching intern' });
    }
    res.json(results[0]);
  });
});

// Fetch interns by batch ID
app.get('/api/interns/batch/:batchId', (req, res) => {
  const sql = 'SELECT * FROM interns WHERE batchId = ?';
  db.query(sql, [req.params.batchId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching interns by batch' });
    }
    res.json(results);
  });
});


app.delete('/api/interns/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM interns WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});


app.delete('/api/batches/:id', (req, res) => {
  let sql = 'DELETE FROM batches WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: 'Batch deleted', id: req.params.id });
  });
});

// Update an intern
app.put('/api/interns/:id', (req, res) => {
  const { id } = req.params;
  const { name, college, email, city, contact, remarks, type, batchId } = req.body;
  db.query(
    'UPDATE interns SET name = ?, college = ?, email = ?, city = ?, contact = ?, remarks = ?, type = ?, batchId = ? WHERE id = ?',
    [name, college, email, city, contact, remarks, type, batchId, id],
    (err, results) => {
      if (err) {
        console.error('Error updating intern:', err);
        res.status(500).json({ error: 'Error updating intern' });
      } else {
        res.status(200).json({ message: 'Intern updated successfully' });
      }
    }
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
