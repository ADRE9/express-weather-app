const request = require('postman-request');



const geocode = (address,callback) => {
  
  const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJzaGllMTMiLCJhIjoiY2tnYnh0OG9lMGxmYzJ4cWZ0MnV4NWJxNiJ9._tvTPIWRhr1mjQdg6tkCbQ&limit=1';
  
  request({ url: geoCodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location services",undefined);
    } else if (response.body.features.length === 0) {
      callback(undefined,"Cannot find such place.Search again");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location:response.body.features[0].place_name
      });
    }
  });

};

module.exports =geocode;