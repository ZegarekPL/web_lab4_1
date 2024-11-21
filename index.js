'use strict';

const express = require('express');
const cors = require("cors")
const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// define endpoint for exercise 1 here
app.get('/math/circle/:r', (req, res) => {
  const radius = parseFloat(req.params.r);
  if (isNaN(radius) || radius <= 0) {
    return res.status(400).json({ error: 'Invalid radius. Radius must be a positive number.' });
  }

  const area = Math.PI * Math.pow(radius, 2);
  const circumference = 2 * Math.PI * radius;

  const result = {
    area: area.toFixed(2),
    circumference: circumference.toFixed(2)
  };

  res.json(result);
});

app.get('/math/rectangle/:w/:h', (req, res) => {
  const width = parseFloat(req.params.w);
  const height = parseFloat(req.params.h);

  if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
    return res.status(400).json({ error: 'Invalid radius. Radius must be a positive number.' });
  }

  const area = width * height
  const circumference = width + width + height + height

  const result = {
    area: area.toFixed(2),
    circumference: circumference.toFixed(2)
  };

  res.json(result);
});

app.get('/math/power/:base/:exponent', (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  const includeRoot = req.query.root === 'true';

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const result = Math.pow(base, exponent);
  const response = { result };

  if (includeRoot) {
    if (base < 0) {
      // Square root of a negative number is not a real number
      response.root = 'undefined';
    } else {
      response.root = Math.sqrt(base);
    }
  }

  res.json(response);
});

let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
  {
    'joke': 'Dlaczego komputer poszedł do lekarza?',
    'response': 'Bo złapał wirusa!'
  },
  {
    'joke': 'Dlaczego komputer nie może być głodny?',
    'response': 'Bo ma pełen dysk!'
  },
  {
    'joke': 'Co mówi jeden bit do drugiego?',
    'response': '„Trzymaj się, zaraz się przestawiamy!”'
  }
];

let lameJoke = [
  {
    'joke': 'Dlaczego programiści preferują noc?',
    'response': 'Bo w nocy jest mniej bugów do łapania!'
  },
  {
    'joke': 'Jak nazywa się bardzo szybki programista?',
    'response': 'Błyskawiczny kompilator!'
  }
];

app.get('/jokebook/categories', cors(corsOptions), (req, res) => {
  res.json(categories);
});

app.get('/jokebook/joke/:category', cors(corsOptions),(req, res) => {
  const category = req.params.category;
  let jokes;

  if (category === 'funnyJoke') {
    jokes = funnyJoke;
  } else if (category === 'lameJoke') {
    jokes = lameJoke;
  } else {
    return res.status(404).json({ error: `no jokes for category ${category}` });
  }

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json(randomJoke);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
