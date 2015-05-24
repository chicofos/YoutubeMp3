var fs = require('fs');

module.exports = function(callback){


  var path = "/home/chico/Documents/Development/YoutubeMp3/public/music";

  fs.readdir(path, function(err, files){
    var songs = [];
    if(err) console.log(err);
      
      files = files.sort();

      files.forEach(function(file){
        songs.push({name: file});
      });

      callback(songs);
  });
};