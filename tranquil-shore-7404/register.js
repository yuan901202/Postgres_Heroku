var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

var users = [
  { username : 'admin', password : "admin"},
  { username : 'guest', password : "guest"}
]

//remove table if table "userData" exist
query = client.query('DROP TABLE IF EXISTS userData');

//create a table called "userData"
query = client.query('CREATE TABLE userData (
  userid INT PRIMARY KEY,
  username VARCHAR(20) NOT NULL, 
  password VARCHAR(30) NOT NULL)'
);

//put users variables into table
for (var id = 0; id < 2; id++) {  
  query = client.query('INSERT INTO userData (userid, username, password) VALUES($1, $2, $3)', [id, users[id].username, users[id].password]);
}

query.on('end', function(result) { client.end(); });

