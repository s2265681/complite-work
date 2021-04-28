

  var db = require('mysql2-promise')();
 
db.configure({
    "host": "localhost",
    "user": "root",
    "password": "shang5036",
    "database": "users"
});
 
db.execute('SELECT * FROM users WHERE LIMIT = ?', [10]).spread(function (users) {
    console.log('Hello users', users);
});