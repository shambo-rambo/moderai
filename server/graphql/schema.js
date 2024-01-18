const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
// Import Mongoose models
const User = require('./models/User');
const Assignment = require('./models/Assignment');
const GradingCriteria = require('./models/GradingCriteria');
const Feedback = require('./models/Feedback');
const Essay = require('./models/Essay');

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
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            },
        },
        assignment: {
            type: AssignmentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Assignment.findById(args.id);
            },
        },
    },
});

// Define Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
            },
            resolve(parent, args) {
                let user = new User({
                });
                return user.save();
            },
        },
        addAssignment: {
            type: AssignmentType,
            args: {
            },
            resolve(parent, args) {
                let assignment = new Assignment({
                });
                return assignment.save();
            },
        },
        addGradingCriteria: {
            type: GradingCriteriaType,
            args: {
            },
            resolve(parent, args) {
                let gradingCriteria = new GradingCriteria({
                });
                return gradingCriteria.save();
            },
        },
        addFeedback: {
            type: FeedbackType,
            args: {
            },
            resolve(parent, args) {
                let feedback = new Feedback({
                });
                return feedback.save();
            },
        },
        addEssay: {
            type: EssayType,
            args: {
            },
            resolve(parent, args) {
                let essay = new Essay({
                });
                return essay.save();
            },
        },
    },
});

// Export the schema
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
