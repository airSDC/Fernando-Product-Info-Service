const { Pool, Client } = require("pg");
const connectionString = "postgres://localhost:5432/db_test";

const pool = new Pool();
const client = new Client();
client.connect();
// {connectionString: connectionString}

//Example of path -> Users/myUser/desktop/project/Your-component/csv/
//Example of CSVfile -> myfile.csv
loadCSV = (tableName, path, CSVfile) => {
  pool.query(
    `COPY ${tableName} FROM ${path}${CSVfile} WITH (FORMAT csv);`,
    (err, res) => {
      if (err) {
        console.log(`Error copying ${CSVfile}`, err);
      }
      console.log(`${CSVfile} loaded successfully`, res);
      pool.end();
    }
  );
};

// loadCSV('amenities', '/Users/javier/Desktop/CSV','done_1_amenities.csv');

/*
PGUSER=db_test
PGHOST='localhost'
PGPASSWORD=null
PGPORT=5432
PGDATABASE=process.env.db_test
node ./db/postgres.js
*/

pool.connect((err, client, done) => {
  console.log("Pool is connecting");
  if (err) throw err;
  client.query(
    "Select * from roominfo where id = 1",
    // "SELECT * FROM roominfo INNER JOIN amenities ON roominfo.id = amenities.room_id WHERE roominfo.id = 10",
    (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows);
      }
    }
  );
});
