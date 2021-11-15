const postman = require('postman-request');

const getGeoCode = (address, callback) => {
  const key = 'pk.eyJ1Ijoic2ltb25yb3Nlbmt2aXN0IiwiYSI6ImNrdm80a2NodDByNGIyc2pwZXR5NGRveGUifQ.J9S1cBw-nkge7HBwyhbvVg';
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+key+'&limit=1';
  postman.get({url, json: true}, (error, request, body) => {
    if (error) {
      callback({error: 'unable to connect'}, undefined);
      return;
    } 
    else if (body.features.length === 0) {
      callback({error: 'cannot find address ' + address}, undefined);
      return;
    } 
    else {
      const features = body.features[0];
      const data = {
        latitude: features.center[1],
        longitude: features.center[0],
        location: features.place_name
      };
      callback(undefined, data);
    }
  });
};

module.exports = getGeoCode;