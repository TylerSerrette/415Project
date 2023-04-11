const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port = 3000;
var fs = require("fs");

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


// Write to a file 
/*
app.get('/wfile', function(req, res) {
  const myquery = req.query;
  
  var outstring = '';
  for(var key in myquery) { outstring += "--" + key + ">" + myquery[key]; }
  fs.appendFile("mydata.txt", outstring+'\n', (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("Contents of file now:\n");
      console.log(fs.readFileSync("mydata.txt", "utf8"));
    }
  });
 
  res.send(outstring);

});
*/



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
    res.send(ticket);
})

//GET by id
/*
app.get('/rest/tickets/:id', (req,res) => {
  fs.readFile(__dirname + "/tickets.json", 'utf8', function(err, data){
    const id = parseInt(req.params.id);
    const data = data.find((d)=>d.id === id);
    console.log(id);
    res.send(data);
  });
})
*/

/*
app.get('/rest/tickets/:id', async (req, res) => {
  const ticket = await ticket.findById(req.params.id);
  res.json(data);
});
*/

app.get('/rest/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ticket = tickets.find(t => t.id == req.params.id);
  if (!ticket) {
    res.sendStatus(404);
  } else {
    res.json(ticket);
  }
});
