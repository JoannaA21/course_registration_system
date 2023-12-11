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


db.run(`
  CREATE TABLE IF NOT EXISTS Course (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseId TEXT NOT NULL,
    courseCode TEXT NOT NULL,
    courseTitle TEXT NOT NULL, 
    courseStartDate TEXT NOT NULL,
    courseEndDate TEXT NOT NULL,
    courseDays TEXT NOT NULL,
    courseStartTime TEXT NOT NULL,
    courseEndTime TEXT NOT NULL,
    courseInstructor TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the Course table:', err.message);
  } else {
    console.log('Course table created (or already exists)');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS RegisteredCourse (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL, 
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error accessing registered course:', err.message);
  } else {
    console.log('Registered course created (or already exists)');
  }
});


db.run(`
  CREATE TABLE IF NOT EXISTS ContactForm (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    query TEXT NOT NULL,
    admin_id TEXT,
    response TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the ContactForm table:', err.message);
  } else {
    console.log('ContactForm table created (or already exists)');
  }
});