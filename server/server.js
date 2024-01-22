// server.js
const app = require('./app');
const db = require('./config/connection');

const PORT = process.env.PORT || 3000;

// Connect to database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // The GraphQL endpoint is handled in app.js, so no need to log it here again.
  });
});
