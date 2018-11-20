const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const dbConnectionString = process.env.DATABASE_URL || "Something";

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