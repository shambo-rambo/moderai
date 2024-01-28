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

    type Assignment {
        _id: ID
        title: String
        instructions: String
    }

    input AssignmentInput {
        title: String!
        instructions: String!
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        assignments: [Assignment]
        assignment(_id: ID!): Assignment
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
        login(email: String!, password: String!): Auth
        addAssignment(input: AssignmentInput): Assignment
    }
`;

module.exports = typeDefs;