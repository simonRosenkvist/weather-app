const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');

const forecast = require('../src/utils/forecast');
const geoCode = require('../src/utils/geocode');

const app = express();

// *** Defined paths for express config ***
const indexHtml = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// *** Setup handlebars and views location ***
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// *** Setup static directory to serve ***
app.use(express.static(indexHtml));

app.get('', (req, res) => {
  res.render('index', {
    header: 'Weather',
    footer: '. - Never before have so many belived in so few for no reason...',
    name: 'Simon',
    lastName: 'Rosenkvist',
    age: 30
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    header: 'More about us!',
    footer: '. Also, i love alpacas!',
    name: 'Simon Rosenkvist'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    header: 'Help!',
    footer: '. Also, don´t be a wuss!',
    help: ' This is all the instructions you should need: You can do it!'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'Missing address'
    });
  }

  const location = req.query.location;
  geoCode(location, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send(error);
    }

    forecast(latitude.toString().substring(0, 6), longitude.toString().substring(0, 6), (error, {temperature, feelslike, description} = {}) => {
      if (error) {
        return res.send(error);
      }
      const weather = 'The weather in ' + location + ' is ' + description + ' and ' + temperature + 'C degrees. It feels like ' + feelslike + 'C degrees.';
      res.send({
        forecast: weather,
        location: location,
        address: req.query.location
      });
    });
  });
  return;
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      message: 'You need to include a search term'
    });
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('missinghelp', {
    message: 'Help article not found',
    header: 'Missing help index 404',
    footer: '. Im a doctor not a mechanic!'
  });
});

app.get('*', (req, res) => {
  res.render('missing', {
    message: 'Oops, 404! Here lives only Cthulhu and not the page you are looking for...',
    header: 'Missing resource 404',
    footer: '. Ph nglui mglw’nafh cthulhu r´lyeh wgah´nagl fhtagn'
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});