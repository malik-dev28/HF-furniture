import pool from '../config/mysql.js';

async function addPriceColumn() {
  try {
    await pool.execute("ALTER TABLE products ADD COLUMN price INT(11) NOT NULL DEFAULT 0 AFTER subCategory");
    console.log("Column 'price' added successfully.");
    process.exit(0);
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
}

addPriceColumn();
