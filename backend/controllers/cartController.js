import pool from "../config/mysql.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId: bodyUserId, itemId, Colors } = req.body;
    const userId = bodyUserId || req.query?.userId || req.user?.id;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid userId or itemId" });
    }

    if (!Colors || typeof Colors !== "string") {
      return res.status(400).json({ success: false, message: "Colors is required and must be a string" });
    }

    const normalizedColors = Colors.toLowerCase();

    const [users] = await pool.execute("SELECT cartData FROM users WHERE id = ?", [userId]);
    const userData = users[0];
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (typeof cartData === 'string') cartData = JSON.parse(cartData);

    if (cartData[itemId]) {
      if (cartData[itemId][normalizedColors]) {
        cartData[itemId][normalizedColors] += 1;
      } else {
        cartData[itemId][normalizedColors] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][normalizedColors] = 1;
    }

    await pool.execute("UPDATE users SET cartData = ? WHERE id = ?", [JSON.stringify(cartData), userId]);

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId: bodyUserId, itemId, Colors } = req.body;
    let { quantity } = req.body;
    const userId = bodyUserId || req.query?.userId || req.user?.id;

    quantity = Number(quantity);

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid userId or itemId" });
    }
    if (!Colors || typeof Colors !== "string") {
      return res.status(400).json({ success: false, message: "Colors is required and must be a string" });
    }
    if (Number.isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ success: false, message: "Quantity must be a non-negative number" });
    }

    const normalizedColors = Colors.toLowerCase();

    const [users] = await pool.execute("SELECT cartData FROM users WHERE id = ?", [userId]);
    const userData = users[0];
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (typeof cartData === 'string') cartData = JSON.parse(cartData);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (quantity === 0) {
      delete cartData[itemId][normalizedColors];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][normalizedColors] = quantity;
    }

    await pool.execute("UPDATE users SET cartData = ? WHERE id = ?", [JSON.stringify(cartData), userId]);

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const bodyUserId = req.body?.userId;
    const userId = bodyUserId || req.query?.userId || req.user?.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const [users] = await pool.execute("SELECT cartData FROM users WHERE id = ?", [userId]);
    const userData = users[0];
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (typeof cartData === 'string') cartData = JSON.parse(cartData);

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getUserCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, updateCart, getUserCart };