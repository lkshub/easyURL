
assert = require('assert');
// Connection URL
var url = 'mongodb://localhost/easyURL';
var MongoClient = require('mongodb').MongoClient;

module.exports = {
  connectDB : function(){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to mongodb server");
    });
  },
  closeDB : function(){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      db.close();
      console.log("Successfully closed the server");
    });
  },
  generateNewURL : function(){
      
  }

}
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({"a" : 1}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
