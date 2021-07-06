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

server.get('/weatherinfo',  (request, response) => {
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
//---------------------------------------------------------------------------------------------//
// https://api.themoviedb.org/3/search/movie?api_key=81a2f3850f9f6ca2f9e6bb5f104c39d6&query=irbid
//---------------------------------------------------------------------------------------------//





// localhost:3001/moviesinfo?cityName=Seattle

// -------- MOVIES ---------//


server.get('/moviesinfo',  (request, response) => {
 

    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_Key}&query=${request.query.cityName}`;

    axios.get(moviesUrl).then(moviesResponse => {
        let moviesObj = moviesResponse.data.results.map(movie => {
            return (new Movie(movie.title , movie.poster_path , movie.original_language , movie.vote_average))
        })
        response.status(200).send(moviesObj)
    }).catch(error => {
        response.status(404).send(error)
    })

})






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

class Movie {
    constructor(title, poster_path, original_language, vote_average) {
        this.title = title;
        this.poster_path = poster_path;
        this.original_language = original_language;
        this.vote_average = vote_average;
    }
}

server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})
