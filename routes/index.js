var songs = require('../playlist'),
colors = require('colors'),
fs = require('fs'),
path = require('path'),
async = require('async'),
downloader = require('../youtube-dl');

module.exports = function(app){

  app.post('/Datos', onDataRequest);
  app.get('/', onRequest);
  app.get('/songs', updateList);
  app.get('*', notFound);

  var playlist = [];

  function onDataRequest(req,res){

    async.parallel([

      function(callback) {

       var id = req.body.id;
       id = id.split("=")[1];
       
       downloader(id, function(err, result){

        if(err || result === "") { 
          console.log(colors.red("Error:" + err));
          callback(true); 
          return; 
        }
        
        var filePath = "C:" + result.split(":")[2];
        
        //var stat = fs.statSync(filePath);

        callback(false, filePath);

      });
     }
     ],
      //Result of all functions
      function(err, results) {

        if(err) { 
          console.log(colors.red("Error: HERE" + err)); 
          res.send(500, "Server Error"); 
          return; 
        }

        var path = results[0];
        var streamData;

        try {
          streamData = fs.createReadStream(path);
          streamData.pipe(res);
        }
        catch (e) {
          console.log(e);
        }

      });
  }

  function updateList(req, res){

    songs(function(list){

      res.render('songs', {
        songs: list,
        title: "Playlist",
        header: "Downloaded Songs"
      });

    });
  }

  function notFound(req,res){
    res.render('notfound');
  }

  function onRequest(req, res){
    res.render('index',{
      title: 'Index',
      header : "Welcome"
    });
  }


}