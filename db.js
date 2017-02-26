
assert = require('assert');
// Connection URL
var url = 'mongodb://localhost/easyURL';
var MongoClient = require('mongodb').MongoClient;
var characters  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w','x', 'y', 'z'];

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
  generateNewURL : function(long_url, callback){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);

      findShort(db, long_url, function (short_url){
        if (short_url == null){
          short_url = '';
          for (var i = 0; i < 6; i++) {
            short_url = short_url + characters[Math.floor(Math.random()*characters.length)];
          };
          console.log('short_url: '+short_url+' is generated for '+long_url);

          var mainCollection = db.collection('mainCollection');

          mainCollection.insertOne({longURL:long_url, shortURL:short_url}, function(err, r) {
              assert.equal(null, err);
              assert.equal(1, r.insertedCount);
          })

          callback( {isNew : true, shortURL: short_url } );

        }else{
          console.log("Already found");
          callback( {isNew : false, shortURL: short_url } );
        }
      });
      

    });
  },
  retrieveLongURL : function(short_url, callback){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);

      findLong(db, short_url, function(long_url){
        if (long_url == null){
          console.log(long_url+" is not in DB");
          callback( { exist : false } ); 
        }else{
          console.log(long_url+" is in DB");
          callback( { exist : true, longURL : long_url} );
        }
      });
      
    })
  },
  customizeURL : function(long_url, short_url){

  }

}
var findShort = function(db, long_url, callback) {
    var customizeCollection = db.collection('customizeCollection');
    customizeCollection.find({longURL : long_url}).limit(1).toArray(function(err, docs) {
      assert.equal(null, err);
      if (docs.length > 0) {
        callback(docs[0].shortURL);
      } else{
        var mainCollection = db.collection('mainCollection');
        mainCollection.find({longURL : long_url}).limit(1).toArray(function(err, docs) {
          assert.equal(null, err);
          if (docs.length > 0) {
            callback(docs[0].shortURL);
          } else{
            callback(null);
          }
        });
      }
    });
}
var findLong = function(db, short_url, callback) {
    var customizeCollection = db.collection('customizeCollection');
    customizeCollection.find({shortURL : short_url}).limit(1).toArray(function(err, docs) {
      assert.equal(null, err);
      if (docs.length > 0) {
        callback(docs[0].longURL);
      } else{
        var mainCollection = db.collection('mainCollection');
        mainCollection.find({shortURL : short_url}).limit(1).toArray(function(err, docs) {
          assert.equal(null, err);
          if (docs.length > 0) {
            callback(docs[0].longURL); 
          } else{
            callback(null);
          }
        });
      }
    });
}

