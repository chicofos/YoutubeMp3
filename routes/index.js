
var songs = require('../playlist');

module.exports = function(app){

  app.get('/', onRequest);
  app.get('/songs', onSongs);

  var playlist = [];

function updateList(res){
  //get available songs
  songs(function(list){

    res.render('songs', {
      songs: list,
      title: "Playlist",
      header: "Downloaded Songs"
    });

  });

}

  function onSongs(req,res){
    updateList(res);
  }

  function onRequest(req, res){
    res.render('index',{
      title: 'Index',
      header : "Welcome"
    });
  }

}