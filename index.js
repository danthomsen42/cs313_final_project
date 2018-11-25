const express = require("express");
const app = express();
app.use(express.static('public'))
//const port = process.env.PORT || 5001;

app.set('views', __dirname, '/views');
app.set('view engine', 'ejs');
 
const {
    Pool
} = require("pg");

const connectionString = process.env.DATABASE_URL;
//|| "postgres://familyhistoryuser:elijah@localhost:5432/familyhistorydemo";
const pool = new Pool({
    connectionString: connectionString
});


app.set("port", (process.env.PORT || 5001));

//const dbConnectionString = process.env.DATABASE_URL || "Something";
app.listen(app.get("port"), function () {
    console.log("Now listening for connections on port ", app.get("port"));
});

app.get("/getPerson", getPerson);

app.get("/SignInPage", getGameNames);

app.get("/person", getPerson);

function getGameNames(req, res) {    
    var id = req.query.id;
    console.log("Retriving person with id: ", id);

    getGameNameFromDb(id, function (error, result) {        
        console.log("Back from the getGameNameFromDb function with result: ", result);
        
        if (error || result == null || result.length != 1){
            res.status(500).json({success:false, data: error});
        }
        else {
            res.render('SignInPage', {name: result});  
//            res.json(result[0]); 
        } 
    });
}

function getGameNameFromDb(id, callback){
    console.log("getGameNameFromDb called with id: ", id);
    var sql = "SELECT game_name FROM game_info;";
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








function getPerson(req, res) { 
    
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



