const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID } = require('graphql');

// Import Mongoose models
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const GradingCriteria = require('../models/GradingCriteria');
const Feedback = require('../models/Feedback');
const Essay = require('../models/Essay');

// Import resolver functions
const userResolvers = require('./resolvers/userResolvers');
const assignmentResolvers = require('./resolvers/assignmentResolvers');
const gradingCriteriaResolvers = require('./resolvers/gradingCriteriaResolvers');
const feedbackResolvers = require('./resolvers/feedbackResolvers');
const essayResolvers = require('./resolvers/essayResolvers');

// Define Object Types
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

const AssignmentType = new GraphQLObjectType({
    name: 'Assignment',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
    }),
});

const GradingCriteriaType = new GraphQLObjectType({
    name: 'GradingCriteria',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        // Add other fields
    }),
});

const FeedbackType = new GraphQLObjectType({
    name: 'Feedback',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        // Add other fields
    }),
});

const EssayType = new GraphQLObjectType({
    name: 'Essay',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        // Add other fields
    }),
});

// Define the Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...userResolvers.Query,
        ...assignmentResolvers.Query,
        ...gradingCriteriaResolvers.Query,
        ...feedbackResolvers.Query,
        ...essayResolvers.Query,
    },
});

// Define Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...userResolvers.Mutation,
        ...assignmentResolvers.Mutation,
        ...gradingCriteriaResolvers.Mutation,
        ...feedbackResolvers.Mutation,
        ...essayResolvers.Mutation,
    },
});

// Export the schema
module.exports = new GraphQLSchema({ 
    query: RootQuery, 
    mutation: Mutation,
});
