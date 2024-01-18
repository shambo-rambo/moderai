require('dotenv').config();

const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.error('MongoDB connection error:', err));

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

const app = express();

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true, // Set to false in production
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
