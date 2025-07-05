const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const headlineTemplates = [
  "Why {{name}} is {{location}}'s Sweetest Spot in 2025",
  "Discover the Secret Behind {{name}}’s 5-Star Reviews",
  "{{location}} Locals Can’t Get Enough of {{name}}!",
  "How {{name}} Became {{location}}’s Dessert Destination",
];

function generateHeadline(name, location) {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template
    .replace(/{{name}}/g, name)
    .replace(/{{location}}/g, location);
}

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Missing name or location in request body' });
  }

  const response = {
    rating: (Math.random() * 1 + 4).toFixed(1),
    reviews: Math.floor(Math.random() * 300 + 5),
    headline: generateHeadline(name, location)
  };

  res.json(response);
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: 'Missing name or location query parameters' });
  }

  const headline = generateHeadline(name, location);
  res.json({ headline });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
