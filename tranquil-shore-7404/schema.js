var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

//exist variables
var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don’t be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you’re afraid to live. What a way to exist."}
];

//remove table if table "myTable" exist
//query = client.query('DROP TABLE IF EXISTS myTable');

//create a table called "myTable"
query = client.query('CREATE TABLE myTable(id SERIAL PRIMARY KEY, author VARCHAR(20) not null, text VARCHAR(500) not null)');

//put quotes variables into table
for (var id = 0; id < 4; id++) {	
	query = client.query('INSERT INTO myTable (id, author, text) VALUES($1, $2, $3)', [id, quotes[id].author, quotes[id].text]);
}

query.on('end', function(result) { client.end(); });
