const yargs = require('yargs');
const request = require('request');

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weather) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weather.temperature}. It feels like ${weather.apparentTemperature}`);
            }
        });
    }
});



//495234615dffecf93cd6485850b07874

//https://api.darksky.net/forecast/495234615dffecf93cd6485850b07874/-31.34569419999999,-64.3365754

