const express = require("express");
const mysql = require("mysql2/promise");


const app = express();
app.use(express.json());


const host = process.env.MYSQL_HOST || 'mysql';
const user = process.env.MYSQL_USER || 'root';
const password = process.env.MYSQL_PASSWORD || process.env.MYSQL_ROOT_PASSWORD || 'rootpassword';
const database = process.env.MYSQL_DATABASE || 'ordersdb';


async function initDb() {
const connection = await mysql.createConnection({ host, user, password });
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
await connection.query(`USE \`${database}\``);
await connection.query(`
CREATE TABLE IF NOT EXISTS orders (
id INT AUTO_INCREMENT PRIMARY KEY,
product VARCHAR(255)
)
`);


const [rows] = await connection.query("SELECT COUNT(*) as count FROM orders");
if (rows[0].count === 0) {
await connection.query("INSERT INTO orders (product) VALUES (?), (?), (?)", ["Laptop", "Phone", "Headphones"]);
console.log("Seeded Orders Table ✅");
}


await connection.end();
}


initDb().catch(err => console.error('DB init error', err));


const pool = mysql.createPool({ host, user, password, database, waitForConnections: true, connectionLimit: 10 });


app.get("/api/orders", async (req, res) => {
const [rows] = await pool.query("SELECT * FROM orders");
res.json(rows);
});


app.post("/api/orders", async (req, res) => {
const { product } = req.body;
if (!product) return res.status(400).json({ error: 'product required' });
const [result] = await pool.query("INSERT INTO orders (product) VALUES (?)", [product]);
res.json({ id: result.insertId, product });
});


const port = process.env.PORT || 4002;

app.listen(port, () => {
  console.log(`Orders service running on port ${port}`);
});
