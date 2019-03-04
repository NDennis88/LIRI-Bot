// require.env file
require("dotenv").config();

// require request
var request = require("request");

// require moment
var moment = require("moment");

// require file systems
var fs = require("fs");

// link to keys.js page
var keys = require("./keys.js");

// initialize Spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// take user command and input
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join("+");
var textFile = "log.txt"
userCommand(userInput, userQuery);

// LIRI-Bot logic
function userCommand(userInput, userQuery) {
    // decision is made based on the command
    switch (userInput) {
        case "concert-this":
            concertThis(userQuery);
            break;
        case "spotify-this-song":
            spotifyThisSong(userQuery);
            break;
        case "movie-this":
            movieThis(userQuery);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Something went wrong!");
            return;
    }
}
userCommand(userInput, userQuery);

function concertThis(userQuery) {
    console.log('\n -----\n\nSearching for...' + userQuery + 's next show...');
    var artist = userQuery;
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    // if there is no error gives a 200 status code (everything is ok)
        if(!error && response.statusCode === 200) {
            // capture data and use JSON to format
          var userBand = JSON.parse(body);
        // parse data and use for loop to access data
        if(userBand.length > 0) {
            for (i = 0; i < 1; i++) {
                // console.log("Artist: ", userBand[i].lineup[0]);
                console.log("Venue: ",userBand[i].venue.name);
                console.log("Location: ", userBand[i].venue.city + "," + userBand[i].venue.region + "," + userBand[i].venue.country);
                var concertDate = moment(userBand[i].datetime).format('MM/DD/YYYY, h:mm a').split(", ");
                console.log("Date: ", concertDate[0]);
                console.log("Time: ", concertDate[1]);
                contentAdded();
            }
        } else {
            console.log("Something went wrong!")
        };
        }
    });
}