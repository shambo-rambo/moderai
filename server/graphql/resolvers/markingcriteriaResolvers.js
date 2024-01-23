const { GraphQLID, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } = require('graphql');
const MarkingCriteriaType = require('../types/MarkingCriteriaType');
const MarkingCriteria = require('../../models/MarkingCriteria');

// Define a GraphQL input type for marking criteria item
const CriteriaInputType = new GraphQLInputObjectType({
    name: 'CriteriaInput',
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

const markingcriteriaResolvers = {
    Query: {
        markingcriteria: {
            type: MarkingCriteriaType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                return await MarkingCriteria.findById(args.id);
            },
        },
        markingcriterias: {
            type: new GraphQLList(MarkingCriteriaType),
            resolve: async () => {
                return await MarkingCriteria.find({});
            },
        },
    },
    Mutation: {
        addMarkingCriteria: {
            type: MarkingCriteriaType,
            args: {
                assignment: { type: GraphQLID },
                criteria: { type: new GraphQLList(CriteriaInputType) }
            },
            resolve: async (parent, args) => {
                let markingcriteria = new MarkingCriteria({
                    assignment: args.assignment,
                    criteria: args.criteria
                });
                return await markingcriteria.save();
            },
        },
    },
};

module.exports = markingcriteriaResolvers;