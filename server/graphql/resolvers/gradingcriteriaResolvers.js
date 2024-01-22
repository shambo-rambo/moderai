const { GraphQLID, GraphQLList, GraphQLString } = require('graphql');
const GradingCriteriaType = require('../types/GradingCriteriaType');
const GradingCriteria = require('../../models/GradingCriteria');

const gradingcriteriaResolvers = {
    Query: {
        gradingcriteria: {
        type: GradingCriteriaType,
        args: { id: { type: GraphQLID } },
        resolve: async (parent, args) => {
            return await GradingCriteria.findById(args.id);
        },
        },
        gradingcriterias: {
        type: new GraphQLList(GradingCriteriaType),
        resolve: async () => {
            return await GradingCriteria.find({});
        },
        },
    },
    Mutation: {
        addGradingCriteria: {
        type: GradingCriteriaType,
        args: {
            title: { type: GraphQLString }, 
        },
        resolve: async (parent, args) => {
            let gradingcriteria = new GradingCriteria({
            title: args.title,
            });
            return await gradingcriteria.save();
        },
        },
    },
    };

module.exports = gradingcriteriaResolvers;