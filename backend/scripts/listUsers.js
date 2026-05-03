import pool from "../config/mysql.js";

const listUsers = async () => {
  try {
    const [users] = await pool.execute("SELECT id, name, email, role FROM users");
    console.log("Current Users in Database:");
    console.table(users);
    process.exit(0);
  } catch (error) {
    console.error("Error listing users:", error);
    process.exit(1);
  }
};

listUsers();
