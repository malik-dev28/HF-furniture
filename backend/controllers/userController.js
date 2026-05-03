import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/mysql.js";

// Route for updating user profile and password
const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const { name, email, phone, password } = req.body;
    
    let query = "UPDATE users SET ";
    const params = [];
    const fields = [];

    if (name) {
      fields.push("name = ?");
      params.push(name);
    }
    if (email) {
      const cleanEmail = String(email).trim().toLowerCase();
      if (!validator.isEmail(cleanEmail)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
      
      // Check for duplicate email (not current user)
      const [existing] = await pool.execute("SELECT id FROM users WHERE email = ? AND id != ?", [cleanEmail, userId]);
      if (existing.length > 0) {
        return res.json({ success: false, message: "Email already in use" });
      }
      fields.push("email = ?");
      params.push(cleanEmail);
    }
    if (phone) {
      fields.push("phone = ?");
      params.push(phone);
    }
    if (password) {
      if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      fields.push("password = ?");
      params.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.json({ success: false, message: "No fields to update" });
    }

    query += fields.join(", ") + " WHERE id = ?";
    params.push(userId);

    const [result] = await pool.execute(query, params);
    
    if (result.affectedRows === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const [updatedUsers] = await pool.execute("SELECT id, name, email, phone, role, isActive, cartData, createdAt FROM users WHERE id = ?", [userId]);
    res.json({ success: true, user: updatedUsers[0] });
  } catch (error) {
    console.error('Profile update error:', error.stack || error);
    res.json({ success: false, message: error.message });
  }
};

const createTokenCustomer = (id, role = "user") => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = String(email || '').trim().toLowerCase();
    password = String(password || '');

    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    if (user.isActive === 0) {
      return res.status(403).json({ success: false, message: 'Account disabled. Contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createTokenCustomer(user.id, user.role);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;
    email = String(email || '').trim().toLowerCase();
    password = String(password || '');

    const [exists] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'user')",
      [name, email, hashedPassword, phone]
    );

    const token = createTokenCustomer(result.insertId);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPass = String(password || '');

    const [admins] = await pool.execute(
      "SELECT * FROM users WHERE email = ? AND role IN ('admin', 'superadmin')",
      [cleanEmail]
    );
    const dbAdmin = admins[0];

    if (dbAdmin) {
      if (dbAdmin.isActive === 0) {
        return res.status(403).json({ success: false, message: 'Account disabled. Contact support.' });
      }
      const isMatch = await bcrypt.compare(cleanPass, dbAdmin.password);
      if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });
      const token = createTokenCustomer(dbAdmin.id, dbAdmin.role);
      return res.json({ success: true, token });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || "").replace(/\"/g, "").trim().toLowerCase();
    const adminPass = (process.env.ADMIN_PASSWORD || "").replace(/\"/g, "").trim();
    if (cleanEmail === adminEmail && cleanPass === adminPass) {
      const token = createTokenCustomer("env-admin", "admin");
      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: "User doesn't exist or invalid credentials" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin register
const adminRegister = async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;
    email = String(email || '').trim().toLowerCase();
    password = String(password || '');

    const [exists] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'admin')",
      [name, email, hashedPassword, phone]
    );

    const token = createTokenCustomer(result.insertId, 'admin');
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId || userId === 'env-admin') {
      const adminEmail = (process.env.ADMIN_EMAIL || "").replace(/\"/g, "").trim();
      if (req.user?.role === 'admin' && req.user?.id === 'env-admin') {
        return res.json({ success: true, user: { name: 'Administrator', email: adminEmail, role: 'admin' } });
      }
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const [users] = await pool.execute("SELECT id, name, email, phone, role, isActive, cartData, createdAt FROM users WHERE id = ?", [userId]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT id, name, email, phone, role, isActive, createdAt FROM users ORDER BY createdAt DESC");
    res.json({ success: true, users });
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    if (typeof isActive === 'undefined') {
      return res.status(400).json({ success: false, message: 'isActive is required' });
    }
    
    await pool.execute("UPDATE users SET isActive = ? WHERE id = ?", [isActive ? 1 : 0, id]);
    
    const [users] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    res.json({ success: true, user: users[0] });
  } catch (err) {
    console.error('Update user status error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { loginUser, registerUser, adminLogin, adminRegister, userProfile, listUsers, updateUserStatus, updateProfile };
