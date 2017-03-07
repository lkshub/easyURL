var db = require('./db');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

db.connectDB();

app.use(express.static('./'));

app.get('/', function(req, res){
	console.log('received index page request');
	res.sendFile(__dirname+"/views/index.html");
})
app.get('/[a-z]{6}', function(req, res){
	console.log("has the short request!");
	db.retrieveLongURL(req.url.substring(1,7), function(result){
		if(result.exist){
			res.redirect(result.longURL);
		}
	});
	
	
})
app.post('/generate', urlencodedParser, function(req, res){

	var long_url = req.body.longURL;
	db.generateNewURL(long_url, function(result){
		res.end(JSON.stringify(result));
	});
	
})

var server = app.listen(8081, function () {
	    var host = server.address().address
	    var port = server.address().port
	    console.log("Example app listening at http://%s:%s", host, port)
})
