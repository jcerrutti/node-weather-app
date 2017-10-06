const yargs = require('yargs');
const axios = require('axios');
const iplocation = require('iplocation');

const GEOCODE_API_KEY = 'AIzaSyAiFV7Fl-yTWvgAhH6a_HATuE7CbYSN-y0';
const WEATHER_API_KEY = '495234615dffecf93cd6485850b07874'

const argv = yargs
    .options({
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var location = () => {
    if (argv.address) {
        const encodeLocation = `https://maps.googleapis.com/maps/api/geocode/json?address=$${argv.address}&key=${GEOCODE_API_KEY}`;
        return axios.get(encodeLocation);
    } else {
        return iplocation().then((address) => {
            const ipAddress = `${address.region_name}, ${address.country_name}`;
            const encodeLocation = `https://maps.googleapis.com/maps/api/geocode/json?address=$${ipAddress}&key=${GEOCODE_API_KEY}`;
            return axios.get(encodeLocation);
        })
    }
}

location().then((response) => {
    console.log(response.data.results[0].formatted_address);
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lng}?units=si`;
    return axios.get(weatherUrl)
}).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers')
    } else {
        console.log('error');
        console.log(error.message);
    }
});