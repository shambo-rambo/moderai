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
        subjectGroup: String
        markingCriteria: [MarkingCriteria]
    }

    type MarkingCriteria {
        _id: ID
        title: String
        description: String
    }

    type Essay {
        _id: ID
        assignmentId: Assignment
        text: String
    }
    
    input AssignmentInput {
        title: String!
        instructions: String!
        subjectGroup: String!
        markingCriteriaInput: [MarkingCriteriaInput]
    }

    input MarkingCriteriaInput {
        title: String!
        description: String!
    }

    input EssayInput {
        assignmentId: ID!
        text: String!
    }

    type Comment {
        _id: ID!
        text: String!
        essayId: ID!
        userId: User!
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        assignments: [Assignment]
        assignment(_id: ID!): Assignment
        markingCriterias: [MarkingCriteria]
        markingCriteria(_id: ID!): MarkingCriteria
        essays: [Essay]
        essay(_id: ID!): Essay
        commentsByEssay(essayId: ID!): [Comment]
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
        addMarkingCriteria(input: MarkingCriteriaInput): MarkingCriteria
        addEssay(input: EssayInput): Essay
        submitComment(essayId: ID!, text: String!, userId: ID!): Comment
    }
`;

module.exports = typeDefs;