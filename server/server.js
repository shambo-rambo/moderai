const app = require('./app');
const db = require('./config/connection');

const PORT = process.env.PORT || 3000; // Ensure this port matches the one in .env or choose a default

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
