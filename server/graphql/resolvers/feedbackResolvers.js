const { GraphQLID, GraphQLList, GraphQLString } = require('graphql');
const Feedback = require('../../models/Feedback');
const FeedbackType = require('../types/FeedbackType');

const feedbackResolvers = {
    Query: {
        feedback: {
        type: FeedbackType,
        args: { id: { type: GraphQLID } },
        resolve: async (parent, args) => {
            return await Feedback.findById(args.id);
        },
        },
        feedbacks: {
        type: new GraphQLList(FeedbackType),
        resolve: async () => {
            return await Feedback.find({});
        },
        },
    },
    Mutation: {
        addFeedback: {
        type: FeedbackType,
        args: {
            content: { type: GraphQLString }, 
        },
        resolve: async (parent, args) => {
            let feedback = new Feedback({
            content: args.content,
            });
            return await feedback.save();
        },
        },
    },
    };

module.exports = feedbackResolvers;