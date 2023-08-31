const bodyParser = require('body-parser');
const cors = require('cors')
const UUI = require('uuid').v4

const PORT = 4002;

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Initialize all route with a callback function

app.get('/all', (_, res) => {
    res.json(projectData)
})

app.post('/add', (req, res)=>{
    const {date, temp, feelings} = req.body;

    const KEY = UUI()
    projectData[KEY] = {date, temp, feelings};

    console.log(projectData);
    res.status(201).send('Created');
})

// Setup Server
app.listen(PORT, ()=>{
    console.log(`Server listing at http://localhost:${PORT}`)
})