const db = require('../config/db');

async function initDb() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      )
    `;
    
    await db.query(createTableQuery);
    console.log('Schools table created successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating table:', error.message);
    process.exit(1);
  }
}

initDb();
