const request = require("postman-request");

module.exports = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4c467d97960d7c48b3972a7cc13733e2&query=${latitude},${longitude}`;
  
  request({ 
    url,
    json: true,
  }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service (weather stack)", null);
    } else if (body.error) {
      callback("Unable to find location. Please try again.", null);
    } else {

      const { current } = body;
      callback(null, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out and feels like ${current.feelslike} degrees outside`)
    }
  });
  
};
