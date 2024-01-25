// server.js
const app = require('./app');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/schema');
const uploadRoutes = require('./routes/upload');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const server = new ApolloServer({ schema });

app.use(express.json()); // Parses JSON bodies

// Define your routes here
app.use('/api', uploadRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start the Apollo server and apply it as middleware
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
});

module.exports = app;


// Connect to database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // The GraphQL endpoint is handled in app.js, so no need to log it here again.
  });
});
