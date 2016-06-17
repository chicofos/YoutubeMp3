var path = require('path');
var exec = require('child_process').exec;
var iconv  = require('iconv-lite');

module.exports = function(id, callback){
  //call command
  var publicPath = path.dirname(__dirname)+ '/public';

  var cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "'+publicPath+'/music/%(title)s.%(ext)s" https://www.youtube.com/watch?v=' + id;
  console.log("Downloading ID: %s", id);

  var child = exec(cmd,{ encoding: 'buffer' }, function(error,stdout,stderr){
    if (error !== null) {
      return callback(error);
    }

    var fi;

    var utf8String = iconv.decode(new Buffer(stdout), "ISO-8859-1"); 
    var log = utf8String.split("\n");

    for (var i=0; i < log.length; i++) {
        if(log[i].indexOf('Destination:') != -1){
          fi = log[i];
        }
    }    

    var path = fi.trim().replace(publicPath,'');

    console.log('PATH:  ' + path);
    console.log("Mp3 id %s  Done!", id);
    return callback(null, path);
  });
}
