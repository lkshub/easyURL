var db = require('./db');
var express = require('express');
var app = express();
var fs = require("fs");


db.connectDB();

app.get('/', function(req, res){
	res.sendFile(__dirname + "/"+"index.html");
})

app.post('/generate', function(req, res){
	
})