const request = require('request');

const API_KEY = '495234615dffecf93cd6485850b07874'

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=si`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
}

module.exports = {
    getWeather
}