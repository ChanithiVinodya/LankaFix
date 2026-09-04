// server/index.js
const express = require('express');
const app = express();

app.use(express.json());

const trackRoute = require('./routes/track');
app.use('/api/issues', trackRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});