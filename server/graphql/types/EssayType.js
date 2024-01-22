const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const EssayType = new GraphQLObjectType({
    name: 'Essay',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
    }),
});

module.exports = EssayType;