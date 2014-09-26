var mongoose = require('mongoose');
var csv = require("fast-csv");

var airportSchema = new mongoose.Schema({
    "id":String,
    "ident":String,
    "type":String,
    "name":String,
    "latitude_deg":String,
    "longitude_deg":String,
    "elevation_ft":String,
    "continent":String,
    "iso_country":String,
    "iso_region":String,
    "municipality":String,
    "scheduled_service":String,
    "gps_code":String,
    "iata_code":String,
    "local_code":String,
    "home_link":String,
    "wikipedia_link":String,
    "keywords":String
});
mongoose.model( 'Airport', airportSchema );
var Airport = mongoose.model('Airport');

//connect to our mongo database
var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/airports');

//if we have any errors, show them in console
db.on('error', function (err) {
    console.log('connected ' + err.stack);
});

//when we disconnect from mongo, show this in console
db.on('disconnected', function(){
    console.log('disconnected');
});

//when we connect to mongo, show this in console
db.on('connected',function(){
    console.log('connected');

    //load some data to the database
    csv.fromPath("data/large.csv", {headers : true})
        .on("data", function(data){
            var record = new Airport(data);
            record.save( function( err, user ){
                if(!err){
                    console.log('Saved airport');
                }
                else{
                    console.log(err);
                }
            });
        })
        .on("end", function(){
            console.log("done");
        });
});

//make sure that we are closing the connection to mongo if something happens to node (like Ctrl + C)
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});





