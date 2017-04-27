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
	//console.log('received index page request');
	res.sendFile(__dirname+"/views/index.html");
})

app.get('/resume', function(req, res){
	res.sendFile(__dirname + '/resource/document/resume.pdf');
})


app.get('/[a-z|A-Z|0-9]+', function(req, res){
	//console.log("has the short request!");
	db.retrieveLongURL(req.url.substring(1,7), function(result){
		if(result.exist){
			res.redirect(result.longURL);
		}else{
  			res.redirect('/#!/notfound');
		}
	});
})


app.post('/generate', urlencodedParser, function(req, res){

	var long_url = req.body.longURL;
	//console.log(req);
	db.generateNewURL(long_url, function(result){
		res.send(JSON.stringify(result));
	});
	
})

app.post('/customize', urlencodedParser, function(req, res){

	var long_url = req.body.longURL;
	var short_url = req.body.shortURL;
	//console.log(req);
	db.customizeURL(long_url, short_url, function(result){
		res.end(JSON.stringify(result));
	});
	
})
//testingtesting
app.get('*', function(req, res){
  res.redirect('/#!/notfound');
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}
