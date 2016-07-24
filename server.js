var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true})); //this is a new addition
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
  console.log("I received a get request")

  
  //   person1= {
  //   name: "Tim",
  //   email: "tim@email.com",
  //   number: "(111) 111 1111"
  //   };

  //   person2= {
  //   name:"Emily",
  //   email:"emily@email.com",
  //   number:"(222) 222 2222"
  //   };

  //   person3= {
  //   name:"John",
  //   email:"john@email.com",
  //   number:"(333) 333 3333"
  //   };

  // var contactlist = [person1, person2, person3];
  // res.json(contactlist);

  db.contactlist.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  })
});

app.post('/contactlist', function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    })
})

app.listen(3000);
console.log("server running on PORT 3000!")

// req, res is request, response
//console.log("I received a get request") tells the server to listen for a get request through the created contactlist route, and when it receives a get request, it will print "I received a get request" to the command prompt (in the teminal, not the console in inspect)
// res.json(contactlist) is going to respond to the get request by sending back the contactlist data in json format, which the controller can then use
// requiring mongojs requires the mongojs module so we can use it
// var db = mongojs('contactlist'm ['contactlist']) specifies which mongodb database and collection we'll be using
// now we'll first comment out dummy data from person1 to res.json, this is because we're now going to get our data from mongodb with our get request
// now to have our server find the data from our contaclist database and collection, we type db.contactlist.find, etc.
// docs means that it will respond with documents from the database, in this case, the contacts from the database
// the console.log(docs), is just a test to make sure we're receiving data from the database
// the res.json, in other words the response.json, sends the data back to the controller
// so now we've successfully made a get request to retrieve data from our mongodb database, the next step is to prepare the index.html to be able to post new data to the contactlist
// app.post makes the server listen to the post request from controller.js, this sends the data from the input boxes in index.html that passes through the controller.js, to the server
// console.log(req.body) will not work yet, because it's actually requesting the data from the body of the input data, and the server does not know how to parse the data from the body yet which in this case, I think is in json
// to have the server parse the body of the input, another module called body-parser has to be installed first (install by npm install body-parser)
// after installing body-parser, declare it via a variable near the top of the code of server.js
// then type in app.use(bodyParser.json()) so now the server can parse the body of the input that it receives, which in this case is json
// so now the input can both appear in the console.log of the inspector on the browser and also on the console.log of the terminal
//  db.contactlist.insert(req.body, function(err, doc){ res.json(doc); }) now allows data to be able to insert the input data that the user inputs into the mongodb database and also sends the new data from the database back to the controller.js
//
//