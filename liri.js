require("dotenv").config();

var fs = require("fs")

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

const axios = require('axios');

var command = process.argv[2];

var input = process.argv.slice(3).join(" ");

var moment = require('moment');

switch (command) {

    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis()
        break;

    case "do-what-it-says":
        doWhatItSays()
        break;
}

function concertThis() {

    axios
        .get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(response => {

            const concerts = response.data;
            concerts.forEach(concert => {
                let date = concert.datetime;
                let formattedDate = moment(date).format("MMM, Do, YYYY, h:mm A");
                console.log(concert.venue.name);
                console.log(concert.venue.city);
                console.log(formattedDate);
                console.log("*****")

            })


        })
}

function movieThis() {

    if (input === "") {
        input = "Mr. Nobody"

    }

    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
        .then(response => {
            const movie = response.data;
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMBD Rating: " + movie.Ratings[0].Value);
            console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
            console.log("Country Produced: " + movie.Country);
            console.log("Languages: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);

        });


}

function spotifyThisSong() {
    if (input === "") {
        input = "The Sign Ace of base"
    }

    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            //console.log(response.tracks.items);
            const tracks = response.tracks.items;
            tracks.forEach(track => {
                console.log(track.artists[0].name)
                console.log(track.name)
                console.log(track.preview_url)
                console.log(track.album.name)

                console.log("****************")
            })
        })
        .catch(function (err) {
            console.log(err);
        });

}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8',
        (err, data) => {
            if (err) {
                return console.error(err)

            }

            var dataArr = data.split(",")

            command = dataArr[0]
            input = dataArr[1]

            switch (command) {

                case "concert-this":
                    concertThis();
                    break;

                case "spotify-this-song":
                    spotifyThisSong();
                    break;

                case "movie-this":
                    movieThis()
                    break;
            }
        })
}




