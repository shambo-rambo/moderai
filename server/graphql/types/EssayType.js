const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const EssayType = new GraphQLObjectType({
    name: 'Essay',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        submittedBy: { type: GraphQLID },
        assignment: { type: GraphQLID },
    }),
});

module.exports = EssayType;