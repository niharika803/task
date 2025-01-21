var express = require('express');
var mysql = require('mysql2');

var app = express();
var port = 3000;


var db = mysql.createConnection({
  host: 'localhost',        
  user: 'root',             
  password: 'yourpassword',
  database: 'yourdatabase',
});


db.connect(function (err) {
  if (err) {
    console.log('MySQL connection failed: ' + err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

app.get('/', function (req, res) {
  res.send('Express.js server is running');
});

app.get('/test-db', function (req, res) {
  db.query('SELECT ', function (err, results) {
    if (err) {
      res.send('Database query failed');
      return;
    }
    res.send('Database connected! '  + results[0].solution);
  });
});


app.listen(port, function () {
  console.log('Server running at http://localhost:' + port);
});
