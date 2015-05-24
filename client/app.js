var io = require('socket.io-client');

var socket = io.connect();

var loader = document.getElementById("load");
var button = document.getElementById("btn");
var input = document.getElementById("input");
var message = document.getElementById("message");

button.addEventListener('click', function(e){

  e.preventDefault();
  
  message.innerText = "";
  var id="";

  if(input.value != "" && input.value.indexOf("youtube") != -1){
    //split the url and get id
    id = input.value.split("=")[1];
    download(id);
  }
  else if (input.value.indexOf("youtu.be") > -1){
    id = input.value.split("/")[3];
    download(id);
  }
  else{
    alert('Enter a valid URL');
  }

}, null)

function download(id){
    //download id
    socket.emit('download', id);
    //show loader
    loader.setAttribute("style", "display: inline;");
    btn.setAttribute("disabled", "true");
}

//hide loader
loader.setAttribute("style", "display: none;");

socket.on('result', function(msg){
  loader.setAttribute("style", "display: none;");
  message.innerText = msg;
  btn.removeAttribute("disabled");
});

