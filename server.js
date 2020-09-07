// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


/*
 *Initialize the main project folder
 *website is the folder in which static files are in (Html , css , javascript)
*/
app.use(express.static('website'));
// Setup Server
const portNumber = 8000 ;
const server = app.listen(portNumber,()=>{
  console.log(`the port now is connected on port ${portNumber}`);
});

app.get('/send',sendData);
app.post('/add',addData);

function sendData(req,res){
  res.send(projectData);
  console.log(" server has sent the data to the client side");
}

const data =[];
function addData(req,res){
  data.push(req.body);
  projectData=req.body;
  console.log(projectData);
  console.log(" server has recived data from the client side");
}
