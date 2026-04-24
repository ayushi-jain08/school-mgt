const db = require('../config/db');

async function checkTable() {
  try {
    const [rows] = await db.query('SHOW TABLES');
    console.log('Tables in database:', rows);
    
    const [columns] = await db.query('DESCRIBE schools');
    console.log('Columns in schools table:', columns);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkTable();
