var db = require('./db');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

db.connectDB();

app.get('/', function(req, res){
	res.sendFile(__dirname+"/html/index.html");
})
app.get('/[a-z]{6}', function(req, res){
	db.retrieveLongURL(req.url.substring(1,7), function(result){
		if(result.exist){
			res.redirect('http://'+result.longURL);
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