const { GraphQLID, GraphQLList, GraphQLString } = require('graphql');
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
        },
        resolve: async (parent, args) => {
            let essay = new Essay({
            content: args.content,
            });
            return await essay.save();
        },
        },
    },
    };