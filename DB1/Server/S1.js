const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webtech'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// API Routes
app.get('/users', (req, res) => {
    db.query('SELECT * FROM test2', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.query(
        'INSERT INTO test2 (name, email) VALUES (?, ?)',
        [name, email],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, name, email }); // ✅ fixed here
        }
    );
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
