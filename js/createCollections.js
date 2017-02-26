var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/easyURL';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  createConnections(db, function() {
    db.close();
  });
});

var createConnections = function(db, callback) {
  db.createCollection("customizedCollection",
    function(err, results) {
      console.log("Customized URL Collection created.");
    }
  );
  var customizedCollection = db.collection('customizedCollection');
  // Create the index
  customizedCollection.createIndex(
    { shortURL : 1 , longURL : 1 }, function(err, result) {
    console.log(result);
  });

  
  db.createCollection("mainCollection",
    function(err, results) {
      console.log("main URL Collection created.");
    }
  );

  var mainCollection = db.collection('mainCollection');
  // Create the index
  mainCollection.createIndex(
    { shortURL : 1 , longURL : 1 }, function(err, result) {
    console.log(result);
  });

  callback();
};