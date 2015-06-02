var exec = require('child_process').exec;

module.exports = function(id, callback){
  //call command
  var cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "/home/chico/Documents/Development/YoutubeMp3/public/music/%(title)s.%(ext)s" https://www.youtube.com/watch?v=' + id;
  console.log("Downloading ID: %s", id);

  var child = exec(cmd, function(error,stdout,stderr){
      if (error !== null) {
          return callback(error);
      }
      var fi = stdout.split("\n")[6];
      console.log(fi);
      var path = fi.split(":")[1].trim().replace("/home/chico/Documents/Development/YoutubeMp3/public/",'');
      console.log(path);

      console.log("Mp3 with id: %s is Done!", id);
      return callback(null, path);
   });
}