var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static(__dirname)); //tell express to use static file and pass the entire directory __dir
app.use(bodyParser.json()); //this let's body parser know we expect JSON to be coming in with our http request in postman
app.use(bodyParser.urlencoded({extended:false})) //use this to parse url encoded data from POST when using web browser as opposed to postman which is json

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Janes', message: 'Hello'}
]

app.get('/messages', (req, res) => { //app.get is HTTP GET request
    res.send(messages); //send the var messages to //http://localhost:3000/messages
})

app.post('/messages', (req, res) => { //app.post is HTTP POST request, here we use postman
    console.log(req.body);
    messages.push(req.body); //pushing the body from postman to messages array

    res.sendStatus(200); //send the var messages to //http://localhost:3000/messages
})

var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
});