const { GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const Essay = require('../../models/Essay');
const EssayType = require('../types/EssayType');

const essayResolvers = {
    Query: {
        essay: {
            type: EssayType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                return await Essay.findById(args.id);
            },
        },
        essays: {
            type: new GraphQLList(EssayType),
            resolve: async () => {
                return await Essay.find({});
            },
        },
    },
    Mutation: {
        addEssay: {
            type: EssayType,
            args: {
                content: { type: GraphQLString },
                submittedBy: { type: GraphQLID },
                assignment: { type: GraphQLID },
            },
            resolve: async (parent, args) => {
                let essay = new Essay({
                    content: args.content,
                    submittedBy: args.submittedBy,
                    assignment: args.assignment,
                });
                return await essay.save();
            },
        },
        updateEssay: {
            type: EssayType,
            args: {
                id: { type: GraphQLID },
                content: { type: GraphQLString },
                submittedBy: { type: GraphQLID },
            },
            resolve: async (parent, args) => {
                return await Essay.findByIdAndUpdate(
                    args.id,
                    { 
                        content: args.content,
                        submittedBy: args.submittedBy,
                    },
                    { new: true },
                );
            },
        },
        deleteEssay: {
            type: EssayType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: async (parent, args) => {
                return await Essay.findByIdAndRemove(args.id);
            },
        },
    },
};

module.exports = essayResolvers;