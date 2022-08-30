var express = require('express');
var app = express();

app.use(express.static(__dirname)); //tell express to use static file and pass the entire directory __dir

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Janes', message: 'Hello'}
]

app.get('/messages', (req, res) => { //app.get is HTTP GET request
    res.send(messages); //send the var messages to //http://localhost:3000/messages
})

var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
});