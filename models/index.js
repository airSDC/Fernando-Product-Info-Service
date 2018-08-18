const { Pool } = require("pg");

const pool = new Pool({
  user: "javier",
  host: "localhost",
  database: "db_test",
  password: null,
  port: 5432
});

pool.connect();

module.exports = pool;
