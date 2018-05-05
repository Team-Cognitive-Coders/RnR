const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.post('/saveTestCase', (request, response) => {
    var payload = request.body;
    var fileName = payload.testCaseName;
    var chats = payload.chats;

    fs.appendFile("/convo/"+fileName+".json", JSON.stringify(chats), (error) => {
        if(error)
            response.status(500).send();
        response.status(200).send();
    });
    //fs.writeFileSync('notes-data.json',JSON.stringify(notes));
    //var notesString = fs.readFileSync('notes-data.json')

});

app.get('/readTestCase', (request, response) => {
    var fileName = request.query.testCaseName;
    fs.readFile("convo/"+fileName+".json", (error, data) => {
        if(error)
            response.status(500).send();
        else
            response.status(200).send(data);
    })
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});