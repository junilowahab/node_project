const express  = require('express');            //Imports express frameworks
const bodyParser = require('body-parser');      //Helps us read JSON from frontend
const fs = require('fs');                       //Node's built in file system module
const app = express();                          //Create an express app
const PORT = 3000;                              //Set the port where the server will run

const TODOS_FILE = './todos.json'               //Pathe to the file storage

app.use(bodyParser.json())