'use strict';

const express = require('express');
const app = express();

// define endpoint for exercise 1 here
app.get('/math/circle/:r', (req, res) => {
  const radius = parseFloat(req.params.r);
  console.log(radius);
  if (isNaN(radius) || radius <= 0) {
    return res.status(400).json({ error: 'Invalid radius. Radius must be a positive number.' });
  }

  const area = Math.PI * Math.pow(radius, 2);
  const circumference = 2 * Math.PI * radius

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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
