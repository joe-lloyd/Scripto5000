var express = require("express");
//var http = require('http');
var mysql = require("mysql");
var connection = mysql.createConnection({
  port: "3306",
  host : "173.194.87.72",
  user : "root",
  password : "Yun0",
  database : "scripto_5_k"
});
//var app = express();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/* Connection to Database */
connection.connect(function(error){
  if(error)
  {
    console.log("Problem with MySQL "+error);
  }
  else
  {
    console.log("Connected with Database ");
  }
});
app.set('port', process.env.PORT || 3000);
app.get('/',function(req,res){
  res.send('hello index');
});
/*
* Here we will call Database.
* Fetch news from table.
* Return it in JSON.
*/
app.get('/check',function(req,res){
});
app.get('/prof', function(req,res){
  console.log("/prof hit");
  var id = req.param('user_id');
  connection.query("SELECT * FROM user WHERE iduser =? ", [id], function(err,row){
    if(err)
    {
      console.log("error with MySQL /prof "+err);
    }
    else
    {
      res.end(JSON.stringify(row));
      console.log("query successful");
    }
  });
});
app.get('/login',function(req,res){
  console.log("/login hit");
  connection.query("SELECT iduser, username, password from user", function(err,rows){
    if(err)
    {
      console.log("error with MYSQL /Login "+err);
    }
    else
    {
      res.end(JSON.stringify(rows));
      console.log("query successful");
    }
  });
});
app.get('/friends', function(req,res){
  console.log("/friends hit");
  var id = req.param('user_id');
  connection.query("SELECT friends.idfriends, friends.userid, friends.friendid, user.username, user.tagline, user.pic FROM friends JOIN user WHERE friends.userid = ? && f
riends.friendid = user.iduser || friends.friendid = ? && friends.userid = user.iduser;",[id, id], function(err,rows){
      if(err)
      {
        console.log("error with MySQL /friends "+err);
      }
      else
      {
        res.end(JSON.stringify(rows));
        console.log("query successful");
      }
    });
});
app.get('/chats',function(req,res){
  console.log("/chats hit");
  var id = req.param('user_id');
  connection.query("SELECT chat.idchat, friends.idfriends, friends.userid, friends.friendid, user.username, user.tagline, user.pic FROM chat JOIN friends JOIN user WHERE 
friends.userid = ? && friends.friendid = user.iduser && chat.friendshipid = friends.idfriends || friends.friendid = ? && friends.userid = user.iduser && chat.friendshipid
 = friends.idfriends;",[id, id], function(err,rows){
    if(err)
    {
      console.log("error with MySQL /chats "+err);
    }
    else
    {
      res.end(JSON.stringify(rows));
      console.log("query successful");
    }
  });
});
app.get('/chat',function(req,res){
  var id = req.param('user_id');
  var chatid = req.param('chat_id');
  console.log("/chat hit, user id: "+ id +" chat id: "+chatid);
  connection.query("SELECT chat.idchat, friends.idfriends, friends.userid, friends.friendid, user.username, user.tagline, user.pic FROM chat JOIN friends JOIN user WHERE 
friends.userid = ? && friends.friendid = user.iduser && chat.friendshipid = friends.idfriends && chat.idchat = ? || friends.friendid = ? && friends.userid = user.iduser &
& chat.friendshipid = friends.idfriends && chat.idchat = ?;",[id, chatid, id, chatid], function(err,rows){
    if(err)
    {
      console.log("error with MySQL /chats "+err);
    }
    else
    {
      res.end(JSON.stringify(rows));
      console.log("query successful");
    }
  });
});
app.get('/signup', function(req,res){
  console.log('/signup hit');
  var name = req.param('name');
  var pass = req.param('pass');
  var tag = req.param('tag');
  var phone = req.param('phone');
  connection.query("INSERT INTO user (username, phone,tagline, password) VALUES (?, ?, ?, ?);", [name, phone, tag, pass], function(err, row){
    if(err)
    {
     console.log("error with MySQL /signup"+err);
    }
    else
    {
      console.log("account created successful");
    }
  });
});

app.get('/delete', function(req,res){
  console.log("/delete hit");
  var id = req.param('user_id');
  connection.query("DELETE FROM user WHERE iduser=?;", [id], function(err,row){
    if(err)
    {
     console.log("error with MySQL /delete"+err);
    }
    else
    {
      console.log("account deleted successful");
    }
  });
});
app.get('/edit', function(req,res){
  console.log("/edit hit");
  var id = req.param('user_id');
  var name = req.param('name');
  var pass = req.param('pass');
  var tag = req.param('tag');
  var phone = req.param('phone');
  var pic = req.param('pic');
  connection.query("UPDATE user SET username=?, pic=?, phone=?, tagline=?, password=? WHERE iduser=?;", [name, pic, phone, tag, pass, id], function(err,row){
    if(err)
    {
     console.log("error with MySQL /edit"+err);
    }
    else
    {
      console.log("account edit successful");
    }
  });
});

app.get('/findFriend',function(req,res){
  console.log("/findFriend hit");
  var phone = req.param('phone');
  connection.query("SELECT * from user WHERE phone =?;", [phone],function(err,rows){
    if(err)
    {
      console.log("Problem with MySQL"+err);
    }
    else
    {
      res.end(JSON.stringify(rows));
      console.log('query successful');
    }
  });
});
app.get('/addFriend',function(req,res){
  console.log("/addFriend hit");
  var uid = req.param('user_id');
  var fid = req.param('friendid');
  connection.query("INSERT INTO friends (userid, friendid) VALUES (?, ?);", [uid, fid],function(err,rows){
    if(err)
    {
      console.log("Problem with MySQL"+err);
    }
    else
    {
      console.log('query successful');
    }
  });
});

app.get('/deleteFriend',function(req,res){
  console.log("/deleteFriend hit");
  var fid = req.param('idfriends');
  connection.query("DELETE FROM friends WHERE idfriends=?;", [fid],function(err,rows){
    if(err)
    {
      console.log("Problem with MySQL"+err);
    }
    else
    {
      console.log('query successful');
    }
  });
});

app.get('/newChat',function(req,res){
  console.log("/newChat hit");
  var fid = req.param('idfriends');
  connection.query("INSERT INTO chat (friendshipid) VALUES (?);", [fid],function(err,rows){
    if(err)
    {
      console.log("Problem with MySQL"+err);
    }
    else
    {
      console.log('query successful');
    }
  });
});

app.get('/load',function(req,res){
  console.log("/load hit");
  connection.query("SELECT * from user",function(err,rows){
    if(err)
    {
      console.log("Problem with MySQL"+err);
    }
    else
    {
     res.end(JSON.stringify(rows));
    }
  });
});
/* SOCKET IO CODE */
io.on('connection', function(socket){
  console.log('a user is connected')
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
/* END SOCKET IO*/

/*start the server */
app.listen(3000,function(){
  console.log("its started on PORT %s", app.settings.port);
});
http.listen(3001, function(){
  console.log('listening on port 3001 for sockets');
});