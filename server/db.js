var mysql = require('mysql');
var fs = require('fs');
var db;
// Environment Checks
// if (process.env.CLEARDB_DATABASE_URL) {
//    db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL );
// } else {
  // Connect to local MySql database
  db = mysql.createPool({
    connectionLimit: 15,
    port     :  8000,
    host     : 'localhost',
    user     : 'root',
    password : 'mks42',
    database : 'karmic',
    multipleStatements: true,
    acquireTimeout: 1000000
  });
//}

// Handle Errors to keep app from crashing
db.on('error', () => {
  console.error("ERROR IN DATABASE");
});


// Initial DB Setup when Server starts
fs.readFile(__dirname + '/schema.sql', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    data = data.split(";"); // Multiple statement work-around
    data.pop();
    data.forEach((item) => {
      console.log(item)
      db.query(item, function(err, results, fields){
        console.log('in query',item)
        if (err) {
          console.error('here',err);
        } else {
          console.log('SQL Setup');
        }
      });
    });
  }
});
// 5-second keep-alive request
setInterval( () => {
    db.query('SELECT 1');
}, 5000);

// Expose for server use
module.exports = db;
