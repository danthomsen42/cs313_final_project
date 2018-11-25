const express = require("express");
const app = express();
app.use(express.static('public'))
//const port = process.env.PORT || 5001;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const {
    Pool
} = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://familyhistoryuser:elijah@localhost:5432/familyhistorydemo";
const pool = new Pool({
    connectionString: connectionString
});


app.set("port", (process.env.PORT || 5001));

//const dbConnectionString = process.env.DATABASE_URL || "Something";
app.listen(app.get("port"), function () {
    console.log("Now listening for connections on port ", app.get("port"));
});

app.get("/getPerson", getPerson);

app.get("/person", getPerson);


function getPerson(req, res) {
    //console.log("Getting person...");
    //console.log ("Tyring to connect to a db at: "+ dbConnectionString);    

    var id = req.query.id;
    console.log("Retriving person with id: ", id);

    getPersonFromDb(id, function (error, result) {
        
        console.log("Back from the getPersonFromDb function with result: ", result);
        
        if (error || result == null || result.length != 1){
            res.status(500).json({success:false, data: error});
        }
        else {
            res.json(result[0]);    
        }
        
        
        
    });

//    var result = {
//        id: 238,
//        first: "John",
//        last: "Smith",
//        birthdate: "1950-02-05"
//    };
    
    //get the id from the req...
//    res.json({
//        name: "John"
//    });
}


function getPersonFromDb(id, callback){
    console.log("getPersonFromDb called with id: ", id);
    var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
    var params = [id];
    pool.query(sql, params, function(err, result){
       if (err) {
           console.log ("An error with the DB occured");
           console.log(err);
           callback(err, null);
       } 
        
    console.log("Found DB result: " + JSON.stringify(result.rows));
        
        callback(null, result.rows);
        
    });
    
}





//app.listen(port, function(){
//    console.log("Listening on port " + port);
//});





//const {
//    Pool
//} = require('pg');
//const pool = new Pool({
//    connectionString: process.env.DATABASE_URL,
//    ssl: true
//});
//
//
//app.get('/db', async(req, res) => {
//    try {
//        const client = await pool.connect()
//        const result = await client.query('SELECT * FROM test_table');
//        const results = {
//            'results': (result) ? result.rows : null
//        };
//        res.render('pages/db', results);
//        client.release();
//    } catch (err) {
//        console.error(err);
//        res.send("Error " + err);
//    }
//})
