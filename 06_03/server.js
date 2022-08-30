var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname)); //tell express to use static file and pass the entire directory __dir
app.use(bodyParser.json()); //this let's body parser know we expect JSON to be coming in with our http request in postman
app.use(bodyParser.urlencoded({extended:false})) //use this to parse url encoded data from POST when using web browser as opposed to postman which is json

var dBurl = 'mongodb+srv://user:user@firsttry.eqw5y.mongodb.net/test' //to get the connection string, login to atlas mongodb, go to database, click connect, click 'connect using mongodb compass'
var Message = mongoose.model('Message', { //build your schema here, property name: of type string, property message:type string
    name: String,
    message: String
})

app.get('/messages', (req, res) => { //app.get is HTTP GET request
    Message.find({}, (err, messages) => {
        res.send(messages); //send the messages to //http://localhost:3000/messages so it can be retrieved later by the frontend getMessages
    })
})

app.post('/messages', (req, res) => { //app.post is HTTP POST request, here we use postman
    var msg = new Message(req.body);

    msg.save((err) => {
        if(err){
           sendStatus(500)
        }
        io.emit('message', req.body)
        res.sendStatus(200); //send the var messages to //http://localhost:3000/messages
    })
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dBurl, (err) => {
    if(err){
        console.log('error',err);
    }else{
        console.log('mongodb connected')
    }
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
});
