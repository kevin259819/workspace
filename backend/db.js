// backend/db.js
const mysql = require('mysql2/promise');

// Pool de conexiones a MariaDB
const pool = mysql.createPool({
  host: '127.0.0.1',  // o 'localhost'
  user: 'root',       // el mismo usuario que usás en HeidiSQL
  password: '',       // si en Heidi dice "usando contraseña: No", dejalo vacío
  database: 'ecommerce'
});

module.exports = pool;
