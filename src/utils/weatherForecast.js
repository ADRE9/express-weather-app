const request = require('postman-request');

const forecast = (latitude,longitude,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=27feaa8ba6a28aab576bd80524019131&query='+ latitude+','+ longitude+'&units=m';

  request({ url: url, json: true }, (error, response) =>{
    
    if (error) {
      callback("Unable to load the weather data",undefined);
    } else if (response.body.error) {
      callback(undefined, {error: "Unable to find the location provided"})
    } else {
      callback(undefined, {
        forecast:response.body.current.weather_descriptions[0]+" with a temperature of "+response.body.current.temperature+" degrees Celsius which feels like "+response.body.current.feelslike+" degrees Celsius"
      })
    }
  })
};

module.exports = forecast
//.current.weather_descriptions[0]+" with a temperature of "+response.body.current.temperature+" degrees Celsius which feels like "+response.body.current.feelslike+" degrees Celcius"