import cloudinary from "../config/cloudinary.js";
import pool from "../config/mysql.js";

// Add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      colors,
      quantity,
    } = req.body;

    let adminUserId = null;
    const tokenPayload = req.user || req.admin || {};
    adminUserId = tokenPayload.id || tokenPayload._id || tokenPayload.userId;

    if (
      !name ||
      !description ||
      !category ||
      !subCategory ||
      !colors ||
      !quantity
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const imageFiles = [
      ...(req.files?.image1 || []),
      ...(req.files?.image2 || []),
      ...(req.files?.image3 || []),
      ...(req.files?.image4 || []),
    ];

    if (imageFiles.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required." });
    }

    const imagesUrl = await Promise.all(
      imageFiles.map(async (file) => {
        if (!file?.path) {
          throw new Error("File path is missing for one of the uploaded images.");
        }
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const parsedColors = typeof colors === "string" ? JSON.parse(colors) : colors;
    const bestseller = req.body.bestseller === 'true' || req.body.bestseller === true ? 1 : 0;

    // Check for existing product by name
    const [existing] = await pool.execute("SELECT id FROM products WHERE LOWER(name) = ?", [name.toLowerCase().trim()]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Product with this name already exists.' });
    }

    const [result] = await pool.execute(
      "INSERT INTO products (name, description, category, subCategory, colors, quantity, bestseller, image, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, category, subCategory, JSON.stringify(parsedColors), parseInt(quantity), bestseller, JSON.stringify(imagesUrl), adminUserId]
    );

    const [newProducts] = await pool.execute("SELECT * FROM products WHERE id = ?", [result.insertId]);
    res.json({ success: true, message: "Product added successfully.", product: newProducts[0] });
  } catch (error) {
    console.error("Error adding product:", error.message || error);
    res.status(500).json({ success: false, message: "Failed to add product." });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    let query = "SELECT p.*, u.name as adminName, u.email as adminEmail FROM products p LEFT JOIN users u ON p.lastEditedBy = u.id";
    const params = [];
    
    if (req.query.bestseller === 'true') {
      query += " WHERE p.bestseller = 1";
    }

    const [products] = await pool.execute(query, params);
    
    // Map to match the previous structure if needed (e.g., populate)
    const formattedProducts = products.map(p => ({
      ...p,
      lastEditedBy: p.lastEditedBy ? { name: p.adminName, email: p.adminEmail } : null
    }));

    res.json({ success: true, products: formattedProducts });
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products." });
  }
};

// Remove product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Product ID is required." });

    const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.json({ success: true, message: "Product removed successfully." });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Failed to remove product." });
  }
};

// Update product quantity
const updateProductQuantity = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    if (!id) return res.status(400).json({ success: false, message: 'Product ID is required.' });
    if (quantity === undefined || quantity === null) return res.status(400).json({ success: false, message: 'Quantity is required.' });

    const q = parseInt(quantity, 10);
    if (Number.isNaN(q) || q < 0) return res.status(400).json({ success: false, message: 'Quantity must be a non-negative integer.' });

    const [products] = await pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    const product = products[0];
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    const previousQuantity = product.quantity ?? 0;
    const tokenPayload = req.user || req.admin || {};
    const userIdFromAuth = tokenPayload.id || tokenPayload._id || tokenPayload.userId;

    const lastEditedAt = new Date();
    const lastQuantityDelta = q - previousQuantity;
    const changes = { quantity: { from: previousQuantity, to: q } };
    
    let editHistory = product.editHistory || [];
    if (typeof editHistory === 'string') editHistory = JSON.parse(editHistory);
    editHistory.push({ editedBy: userIdFromAuth || null, editedAt: lastEditedAt, changes });

    await pool.execute(
      "UPDATE products SET quantity = ?, lastQuantityDelta = ?, lastEditedBy = ?, lastEditedAt = ?, editHistory = ? WHERE id = ?",
      [q, lastQuantityDelta, userIdFromAuth, lastEditedAt, JSON.stringify(editHistory), id]
    );

    const [updatedProducts] = await pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    res.json({ success: true, message: 'Quantity updated successfully.', product: updatedProducts[0] });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    res.status(500).json({ success: false, message: 'Failed to update quantity.' });
  }
};

// Get single product details
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Product ID is required." });

    const [products] = await pool.execute("SELECT * FROM products WHERE id = ?", [productId]);
    const product = products[0];
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Failed to fetch product." });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct, updateProductQuantity };
