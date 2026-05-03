// routes/adminRoutes.js
import express from 'express';
import pool from '../config/mysql.js';
import authMiddleware from '../middleware/auth.js';
import isSuperAdmin from '../middleware/isSuperAdmin.js';
import bcrypt from "bcrypt";

const router = express.Router();

// Get all admins (super admin only)
router.get('/', authMiddleware, isSuperAdmin, async (req, res) => {
  try {
    const [admins] = await pool.execute(
      "SELECT id, name, email, phone, role, createdAt FROM users WHERE role IN ('admin', 'superadmin')"
    );
    res.json(admins);
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new admin (super admin only)
router.post('/', authMiddleware, isSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    if (!['admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const [exists] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, role]
    );

    const [newAdmins] = await pool.execute(
      "SELECT id, name, email, phone, role, createdAt FROM users WHERE id = ?",
      [result.insertId]
    );
    
    res.status(201).json(newAdmins[0]);
  } catch (err) {
    console.error('Error creating admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete admin (super admin only)
router.delete('/:id', authMiddleware, isSuperAdmin, async (req, res) => {
  try {
    if (req.params.id == req.user.id) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }
    
    const [result] = await pool.execute("DELETE FROM users WHERE id = ? AND role IN ('admin', 'superadmin')", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error('Error deleting admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
