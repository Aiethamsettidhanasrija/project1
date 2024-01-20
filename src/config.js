const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "robocorp.cri2qaltak7m.ap-south-1.rds.amazonaws.com",
    password: "robocorp#300823#",
    port: "3306",
    database: "Robocorp",
    user: "admin",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database');
    return;
  }

  console.log('Database connected');
});

// connection.end();
module.exports=connection;
