'use strict';

const { response } = require('express');
const express = require('express');
const server = express();
require('dotenv').config();
const weather = require('./assests/weather.json');
const cors = require('cors');
const { default: axios } = require('axios');
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


// localhost:3001/weatherinfo?cityName=Seattle

// -------- WeatherBit ---------//

// https://api.weatherbit.io/v2.0/forecast/daily?city=Amman,NC&key=f0f57934a3ad4bdebb32a5e1325ce251

server.get('/weatherinfo', (request, response) => {
    let weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.cityName}&key=${process.env.WeatherBit_Key}`;

    axios.get(weatherBitUrl).then(weatherResponse => {
        let cityObj = weatherResponse.data.data.map(day => {
            return (new City(day.valid_date, day.weather.description))
        })
        response.status(200).send(cityObj)
    }).catch(error => {
        response.status(404).send(error)
    })
})


// -------- WeatherBit ---------//


// // localhost:3001/weatherinfo?cityName=Seattle
// -------------------------------------------
// try{
//     server.get('/weatherinfo', (request, response) => {
//         let selectedCity = weather.find(city => {
//             if (request.query.cityName === city.city_name) { return city }
//         })

//         // response.status(200).send(selectedCity.data);

//         const cityObj = selectedCity.data.map(day => { 
//             return  new City(day.valid_date, day.weather.description)
//         } )
//         response.status(200).send(cityObj)


//     })
// } catch {
//     response.status(404).send('Error 404 : You send a wrong request')
// }



// Error
server.get('*', (request, response) => {
    response.status(404).send('Not Found')
})




class City {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})
