import pool from "../config/mysql.js";

const fixRole = async () => {
  try {
    console.log("Modifying users table to include 'superadmin' role...");
    await pool.execute("ALTER TABLE users MODIFY COLUMN role ENUM('user', 'admin', 'superadmin') DEFAULT 'user'");
    
    console.log("Updating malikapp2828@gmail.com to 'superadmin'...");
    await pool.execute("UPDATE users SET role = 'superadmin' WHERE email = ?", ['malikapp2828@gmail.com']);
    
    console.log("Table updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing role:", error);
    process.exit(1);
  }
};

fixRole();
