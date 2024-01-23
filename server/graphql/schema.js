const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID } = require('graphql');

// Import Mongoose models
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const MarkingCriteria = require('../models/MarkingCriteria');
const Feedback = require('../models/Feedback');
const Essay = require('../models/Essay');

// Import resolver functions
const userResolvers = require('./resolvers/userResolvers');
const assignmentResolvers = require('./resolvers/assignmentResolvers');
const markingCriteriaResolvers = require('./resolvers/markingcriteriaResolvers');
const feedbackResolvers = require('./resolvers/feedbackResolvers');
const essayResolvers = require('./resolvers/essayResolvers');

// Define Object Types
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
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

const MarkingCriteriaType = new GraphQLObjectType({
    name: 'MarkingCriteria',
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
        submittedBy: { type: GraphQLID },
        assignment: { type: GraphQLID },
    }),
});

// Define the Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...userResolvers.Query,
        ...assignmentResolvers.Query,
        ...markingCriteriaResolvers.Query,
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
        ...markingCriteriaResolvers.Mutation,
        ...feedbackResolvers.Mutation,
        ...essayResolvers.Mutation,
    },
});

// Export the schema
module.exports = new GraphQLSchema({ 
    query: RootQuery, 
    mutation: Mutation,
});
