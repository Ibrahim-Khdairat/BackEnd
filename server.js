'use strict';

const { response } = require('express');
const express = require('express');
const server = express();
require('dotenv').config();
const weather = require('./assests/weather.json');
const cors = require('cors');
const { default: axios } = require('axios');
const weatherHandler = require('./modules/weather');
const moviesHandler = require('./modules/movies');
const yelpHandler = require('./modules/yelp')

server.use(cors());


//PORT
const PORT = process.env.PORT;

// localhost:3001/
server.get('/', (request, response) => {
    response.status(200).send('Home Route')
})


// localhost:3001/test
server.get('/test', (request, response) => {
    response.status(200).send('My server is working')
})




// -------- WeatherBit ---------//
// localhost:3001/weatherinfo?cityName=Seattle
server.get('/weatherinfo', weatherHandler);


// -------- MOVIES ---------//
// localhost:3001/moviesinfo?cityName=Seattle
server.get('/moviesinfo', moviesHandler);


//--------- Yelp -----------//
server.get('/yelp', yelpHandler);

// Error
server.get('*', (request, response) => {
    response.status(404).send('Not Found')
})


server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})
