// typDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        users: [User]
        user(_id: ID!): User
       }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Mutation {
        addUser(input: UserInput): Auth
        updateUser(_id: ID!, input: UserInput): User
        deleteUser(_id: ID!): User
    }
`;

module.exports = typeDefs;