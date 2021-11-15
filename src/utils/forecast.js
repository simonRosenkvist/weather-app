const postman = require('postman-request');

const getForecast = (lat, lon, callback) => {
  const key = '7b6646764ed2ef72163d5219b8f7958b';
  const url = 'http://api.weatherstack.com/current?access_key='+ key +'&query='+lat+','+lon+'&units=m';
  postman.get({url, json: true}, (error, request, body) => {
    if (error) {
      callback({error: 'unable to connect'}, undefined);
    }
    else if (body.error) {
      callback({error: 'unable to find location'}, undefined);
    }
    else {
      const response = body.current;
      const data = {
        temperature: response.temperature,
        feelslike: response.feelslike,
        description: response.weather_descriptions[0].toLowerCase(),
        icon: response.weather_icons[0],
        updated: response.observation_time
      }
      callback(undefined, data);
    }

  });
};

module.exports = getForecast;