var fs = require('fs');
var path = require('path');

module.exports = function(callback){

  fs.readdir(path.dirname(__dirname)+ '/public/music', function(err, files){
    
    var songs = [];
    if(err) console.log(err);
      
      files = files.sort();

      files.forEach(function(file){
        songs.push({name: file});
      });

      callback(songs);
  });
};