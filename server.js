'use strict';

const { response } = require('express');
const express = require('express');
const server = express();
require('dotenv').config();
const weather = require('./assests/weather.json')

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


// localhost:3001/weatherinfo?cityName=Seattle
try{
    server.get('/weatherinfo', (request, response) => {
        let selectedCity = weather.find(city => {
            if (request.query.cityName === city.city_name) { return city }
        })
    
        // response.status(200).send(selectedCity.data);
    
        const cityObj = selectedCity.data.map(day => { 
            return  new City(day.valid_date, day.weather.description)
        } )
        response.status(200).send(cityObj)
    
    
    })
} catch {
    response.status(404).send('Error 404 : You send a wrong request')
}



// Error
server.get('*', (request, response) => {
    response.status(404).send('Not Found')
})

server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})


class City {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}