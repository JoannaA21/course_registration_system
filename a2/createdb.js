const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bvc_registration.db');

// Run the SQL query to create the 'Student_user' table
db.run(`
  CREATE TABLE IF NOT EXISTS Student_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    phone TEXT,
    dob TEXT,
    department TEXT,
    program TEXT,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the Student_user table:', err.message);
  } else {
    console.log('Users table created (or already exists)');
  }
});