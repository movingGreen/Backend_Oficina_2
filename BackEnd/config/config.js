const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "123",
  database: "oficina_ecomerce",
});

pool.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED");
});

module.exports = pool;
