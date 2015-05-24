var exec = require('child_process').exec;

module.exports = function(id, callback){
  //call command
  var cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "/home/chico/Documents/Development/YoutubeMp3/public/music/%(title)s.%(ext)s" https://www.youtube.com/watch?v=' + id;
  console.log("Downloading ID: %s", id);

  var child = exec(cmd, function(error,stdout,stderr){
      if (error !== null) {
          return callback(error);
      }
      console.log("Mp3 with id: %s is Done!", id);
      return callback(null, 'Mp3 Downloaded Successfully!');
   });
}