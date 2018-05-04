const express = require('express');
const login = require("facebook-chat-api");
const fs = require("fs");
const bodyParser = require("body-parser");

var app = express();
var credentials, fbApi, payload = {}, pageId;
app.use(express.static(__dirname + '/public'));
//app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use((req, res, next) => {
    credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
    next();
});

app.get("/", function(req, res){
    login({ email: credentials.email, password: credentials.password }, (err, api) => {
        if (err)
            return console.log(err);
        fbApi = api;
        console.log("LOG:Done logging");
        var response = {
            status  : 200,
            success : 'New added!'
        }
        res.status(200).send(JSON.stringify(response));
    });
});

app.get("/startChat/:pageId", function (req, res) {
    payload.chats = [];
    pageId = req.params.pageId; //118809975300669
    listenChats();
    res.send();
});

app.post("/sendMessage", function(req, res){
    var sMessage = req.body.message;
    if(payload.chats){
        fbApi.sendMessage(sMessage, pageId);
        payload.chats.push({"user":sMessage});
    }
    var response = {
        status  : 200,
        success : 'New added!'
    }
    res.status(200).send(JSON.stringify(response));
});

listenChats = function () {
    fbApi.setOptions({ listenEvents: true });

    fbApi.listen((err, event) => {
        if (err)
            return console.log(err);

        if (event.type == "message") {
            var botMessage = event.body;
            if(payload.chats)
                payload.chats.push({"bot":botMessage});
        }
    });
}

app.listen(3000, () => {
    console.log('Listening on port 3000')
});