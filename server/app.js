require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/schema');

const app = express();
const server = new ApolloServer({ schema });

app.use(express.json());

server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
});

module.exports = app;
