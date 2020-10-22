const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherForecast = require('./utils/weatherForecast');

const app = express();

//define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars loaction and views engine.
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name:"MAK"
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Page",
    name: "MAK"
  });
});

app.get('/help', (req, res) => {
  res.render('help',{
    title: "Help",
    message: "This is a weather App",
    name:"MAK"
  });
});

app.get('/about', (req, res) => {
  res.send('<h1 style="color:red">About</h1>');
});

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({error: "No Location Search Found.Enter a location to Search for weather Forecast"})
  }
  geocode(req.query.address, (error, locData) => {
    if (error) {
      return res.send({error:error});
    }
    weatherForecast(locData.latitude, locData.longitude, (forecastError, forecastData) => {
      if (forecastData.error) {
        return res.send({error:forecastData.error})
      }
      res.send({
        forecast: forecastData.forecast,
        location: locData.location,
        address:req.query.address
      });
    });
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title:"404",
    errorMessage: "No Such article on help page found",
    name:"MAK"
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title:"404",
    errorMessage: "My 404 Page",
    name:"MAK"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App is running on port "+PORT);
});

