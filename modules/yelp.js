'use strict'
const { default: axios } = require('axios');

let inMemory = {};
// https://api.yelp.com/v3/businesses/search?location=amman&term=food

//http://localhost:3001/yelp?cityName=Seattle&term=food

const yelpHandler = (request, response) => {

    let sQuery_1 = request.query.cityName;
    let sQuery_2 = request.query.term;
    const ENDPOINT = '/businesses/search'
  

    let yelpREST = axios.create({
        baseURL: `https://api.yelp.com/v3/businesses/search?location=${sQuery_1}&term=${sQuery_2}`,
        headers: {
            Authorization: `Bearer ${process.env.Yelp_API_Key}`,
            "Content-type": "application/json",
        },
    })

    yelpREST(ENDPOINT, { params: { key: ENDPOINT } }).then(({ data }) => {

        let yelpObj = data.businesses.map(service => {
            return (new Yelp(service))
        })

        response.status(200).send(yelpObj)
    }).catch(error =>{
        response.send(error)
    })






    // if (inMemory[sQuery_1] !== undefined) {
    //     console.log('We already have the data');
    //     response.status(200).send(inMemory[sQuery_1]);
    // } else {
    //     axios
    //         .get( yeldUrl , headers )
    //         .then(yeldResponse => {

    //             let yeldObj = yeldResponse.data.businesses.map(service => {
    //                 return (new Yeld( service ))
    //             })
    //             inMemoryRes[sQuery_1] = yeldObj;
    //             console.log('send request again');
    //             response.status(200).send(inMemoryRes[sQuery_1])
    //         }).catch(error => {
    //             response.status(404).send(error)
    //         })

    // }



}

class Yelp {
    constructor(service) {
        this.name = service.name;
        this.image_url = service.image_url;
        this.url = service.url;
        this.rating = service.rating;
        this.price = service.price;
    }
}

module.exports = yelpHandler;



