const { Pool, Client } = require('pg')
const connectionString = 'postgres://localhost:5432/db_test'

const pool = new Pool({
  connectionString: connectionString,
})

//Example of path -> Users/myUser/desktop/project/Your-component/csv/
//Example of CSVfile -> myfile.csv
loadCSV = (tableName, path, CSVfile) => {
  pool.query(`COPY ${tableName} FROM ${path}${CSVfile} WITH (FORMAT csv);`,
    (err, res) => {
      if (err) {
        console.log(`Error copying ${CSVfile}`, err);
      }
      console.log(`${CSVfile} loaded successfully`, res);
      pool.end();
    }
  );
};
