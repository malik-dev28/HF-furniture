import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/mysql.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from 'path';

// App Config
const app = express();
const port = process.env.PORT || 9000;

console.log("Connecting to MySQL at:", process.env.MYSQL_HOST);

// Test MySQL Connection
pool.getConnection()
  .then(connection => {
    console.log("MySQL DB Connected");
    connection.release();
  })
  .catch(err => {
    console.error("MySQL Connection Error Details:", err);
  });

// middlewares
app.use(express.json());
app.use(cors());

// Serve uploaded files
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working with MySQL");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
