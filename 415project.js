const express = require('express');
//const bodyParser=require('body-parser');
const app = express();
const port = 3000;
var fs = require("fs");

app.listen(port);
console.log('Server started at http://localhost:' + port);

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// routes will go here

let tickets = [
  {
    "id": 35436,
    "created_at": "2015-07-20T22:55:29Z",
    "updated_at": "2016-05-05T10:38:52Z",
    "type": "incident",
    "subject": "MFP not working right",
    "description": "PC Load Letter? What does that even mean???",
    "priority": "med",
    "status": "open",
    "recipient": "support_example@selu.edu",
    "submitter": "Michael_bolton@selu.edu",
    "assignee_id": 235323,
    "follower_ids": [
        235323,
        234
    ],
    "tags": [
        "enterprise",
        "printers"
    ]
  }
];

app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Starting... ';
  res.send(outstring);
});

// A POST request

app.post('/rest/ticket', express.json(), (req, res) => {
  const ticket = req.body;
  ticket.id = Date.now(); // Assign a unique id
  tickets.push(ticket);
  res.send(ticket);
  //console.log(Created ticket with id ${ticket.id});
});


//GET all function

app.get('/rest/list/', (req, res) =>{
    res.send(tickets);
})

//GET by id

app.get('/rest/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ticket = tickets.find(t => t.id == req.params.id);
  if (!ticket) {
    res.sendStatus(404);
  } else {
    res.json(ticket);
  }
});
