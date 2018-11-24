const express = require("express");
const app = express();
//const port = process.env.PORT || 5001;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set("port", (process.env.PORT || 5001));

//const dbConnectionString = process.env.DATABASE_URL || "Something";
app.listen(app.get("port"), function() {
    console.log("Now listening for connections on port ", app.get("port"));
});

app.get("/getPerson", getPerson);

app.get("/person", getPerson);


function getPerson(req, res){
//console.log("Getting person...");
//console.log ("Tyring to connect to a db at: "+ dbConnectionString);    
   
var id = req.query.id;   
console.log("retriving person with id: ", id);    
var result = {id: 238, first: "John", last: "Smith", birthdate: "1950-02-05"};    
    res.json(result);
//get the id from the req...
    res.json({name: "John"});
}







//app.listen(port, function(){
//    console.log("Listening on port " + port);
//});





const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })




