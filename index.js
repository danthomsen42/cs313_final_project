const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const dbConnectionString = process.env.DATABASE_URL || "Something";






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




app.get("/person", getPerson);

app.listen(port, function(){
    console.log("Listening on port " + port);
});


function getPerson(req, res){
console.log("Getting person...");
console.log ("Tyring to connect to a db at: "+ dbConnectionString);    
//get the id from the req...
    res.json({name: "John"});
}