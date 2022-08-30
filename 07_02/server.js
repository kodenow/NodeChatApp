var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");

app.use(express.static(__dirname)); //tell express to use static file and pass the entire directory __dir
app.use(bodyParser.json()); //this let's body parser know we expect JSON to be coming in with our http request in postman
app.use(bodyParser.urlencoded({ extended: false })); //use this to parse url encoded data from POST when using web browser as opposed to postman which is json

var dbUrl = "mongodb+srv://user:user@firsttry.eqw5y.mongodb.net/test"; //to get the connection string, login to atlas mongodb, go to database, click connect, click 'connect using mongodb compass'
var Message = mongoose.model(
  "Message", //build your schema here, //this is the collection model, it will be created if it doesn't exists as lowercase and with 's' at then 'messages'
  {
    name: String, //property name: of type string, property message:type string
    message: String,
  }
);

app.get("/messages", (req, res) => {
  //app.get is HTTP GET request
  Message.find({}, (err, messages) => {
    res.send(messages); //send the messages to //http://localhost:3000/messages so it can be retrieved later by the frontend getMessages
  });
});

app.post("/messages", (req, res) => {
  //app.post is HTTP POST request, here we use postman
  var msg = new Message(req.body);

  msg
    .save()
    .then(() => {
      console.log("saved");
      return Message.findOne({ msg: "badword" }); // this promise is returned and is passed to the next then
    })
    .then((censored) => {
      if (censored) {
        //if it finds 'badword' then it will be removed
        console.log("censored words found", censored);
        return Message.deleteOne({ _id: censored.id });
      }
      io.emit("message", req.body);
      res.sendStatus(200); //send the var messages to //http://localhost:3000/messages
    })
    .then()
    .catch((err) => {
      res.sendStatus(500);
      return console.error(err);
    });
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log("mongodb connected");
  }
});

var server = http.listen(3000, () => {
  console.log("server is listening on port", server.address().port);
});
