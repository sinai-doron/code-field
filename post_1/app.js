//all the dependencies we need
var http = require('http'); //this is a built in package that comes with node and there is no need to install it
var express = require('express');
var mongoose = require('mongoose');

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
});


//new app that will work on port 3000
var app = express();
app.set('port', 3000);

//Simple 404 response because we don't have any routing yet
app.use(function(req,res){
    res.status(404);
    res.type('text/plain');
    res.send('404');
});

//start the application and let node listen for requests on port 3000
http.createServer(app).listen(app.get('port'), function(){
    console.log( 'Server started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});

//make sure that we are closing the connection to mongo if something happens to node (like Ctrl + C)
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

