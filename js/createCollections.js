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
      callback();
    }
  );
  db.createCollection("mainCollection",
    function(err, results) {
      console.log("main URL Collection created.");
      callback();
    }
  );
};