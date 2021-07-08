'use strict'
const { default: axios } = require('axios');

let inMemoryResponse = {};

//---------------------------------------------------------------------------------------------//
// https://api.themoviedb.org/3/search/movie?api_key=81a2f3850f9f6ca2f9e6bb5f104c39d6&query=irbid
//---------------------------------------------------------------------------------------------//

const moviesHandler = (request, response) => {

    let sQuery = request.query.cityName;

    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_Key}&query=${sQuery}`;


    if (inMemoryResponse[sQuery] !== undefined) {
        console.log('We already have the data');
        response.status(200).send(inMemoryResponse[sQuery]);
    } else {
        axios.get(moviesUrl).then(moviesResponse => {
            let moviesObj = moviesResponse.data.results.map(movie => {
                return (new Movie(movie.title, movie.poster_path, movie.original_language, movie.vote_average, movie.overview, movie.vote_count, movie.popularity, movie.release_date))
            })
            inMemoryResponse[sQuery] = moviesObj;
            response.status(200).send(moviesObj)
        }).catch(error => {
            response.status(404).send(error)
        })

    }
}

class Movie {
    constructor(title, poster_path, original_language, vote_average, overview, vote_count, popularity, release_date) {
        this.title = title;
        this.poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        this.original_language = original_language;
        this.vote_average = vote_average;
        this.overview = overview;
        this.vote_count = vote_count;
        this.popularity = popularity;
        this.release_date = release_date;
    }
}

module.exports = moviesHandler;