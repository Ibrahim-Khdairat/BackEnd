'use strict'
const { default: axios } = require('axios');

let inMemoryRes = {};
// https://api.weatherbit.io/v2.0/forecast/daily?city=Amman,NC&key=f0f57934a3ad4bdebb32a5e1325ce251

//http://localhost:3001/weatherinfo?cityName=Seattle

const weatherHandler = (request, response) => {

    let sQuery = request.query.cityName;
    let weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WeatherBit_Key}&days=5`;

    if (inMemoryRes[sQuery] !== undefined) {
        console.log('We already have the data');
        response.status(200).send(inMemoryRes[sQuery]);
    } else {
        axios
            .get(weatherBitUrl)
            .then(weatherResponse => {
                
                let cityObj = weatherResponse.data.data.map(day => {
                    return (new a( day.valid_date , day.weather.description ))
                })
                inMemoryRes[sQuery] = cityObj;
                console.log('send request again');
                response.status(200).send(inMemoryRes[sQuery])
            }).catch(error => {
                response.status(404).send(error)
            })
    }



}

class City {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

module.exports = weatherHandler;





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
