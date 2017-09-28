const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')
const request = require('request');

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
        console.log(JSON.stringify(results, undefined, 2));
    }
});


//495234615dffecf93cd6485850b07874

//https://api.darksky.net/forecast/495234615dffecf93cd6485850b07874/-31.34569419999999,-64.3365754

request({
    url: 'https://api.darksky.net/forecast/495234615dffecf93cd6485850b07874/-31.34569419999999,-64.3365754?units=si',
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log('Unable to fetch weather');
    }
})