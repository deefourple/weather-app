const request = require("postman-request");

module.exports = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF2ZWRlZSIsImEiOiJja2FzZ2NyNTAwaTU1MnNtbW15cG44b3lrIn0._lulSroqmKOsaFwzNVslCg&limit=1`;

  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to location services.', null);
    } else if (!body.features.length) {
      cb("Unable to find location. Please try again.", null);
    } else {
      cb(null, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
}
