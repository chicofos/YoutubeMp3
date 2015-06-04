var path = require('path');
var exec = require('child_process').exec;

module.exports = function(id, callback){
  //call command
  var publicPath = path.dirname(__dirname)+ '/public';

  var cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "'+publicPath+'/music/%(title)s.%(ext)s" https://www.youtube.com/watch?v=' + id;
  console.log("Downloading ID: %s", id);

  var child = exec(cmd, function(error,stdout,stderr){
      if (error !== null) {
          return callback(error);
      }

      var fi; 
      var log = stdout.split("\n");

      if(log[6].indexOf('Destination:') != -1)
        fi = log[6];
      else
        fi = log[7]

      console.log(fi);
      var path = fi.split(":")[1].trim().replace(publicPath,'');
      console.log(path);

      console.log("Mp3 with id: %s is Done!", id);
      return callback(null, path);
   });
}