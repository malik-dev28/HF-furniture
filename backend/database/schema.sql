CREATE DATABASE IF NOT EXISTS abubekxc_hf_furniture;
USE abubekxc_hf_furniture;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
    phone VARCHAR(20) NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    cartData JSON,
    lastLogin DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date BIGINT NOT NULL
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    subCategory VARCHAR(255) NOT NULL,
    colors JSON NOT NULL,
    quantity INT NOT NULL,
    bestseller BOOLEAN DEFAULT FALSE,
    image JSON,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastEditedBy INT,
    lastEditedAt DATETIME,
    lastQuantityDelta INT,
    soldCount INT DEFAULT 0,
    editHistory JSON,
    createdBy INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lastEditedBy) REFERENCES users(id),
    FOREIGN KEY (createdBy) REFERENCES users(id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    items JSON NOT NULL,
    address JSON NOT NULL,
    status VARCHAR(50) DEFAULT 'Order Placed',
    date BIGINT NOT NULL,
    paymentMethod VARCHAR(50),
    transactionId VARCHAR(255),
    amount DECIMAL(10, 2),
    bankStatement VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);
