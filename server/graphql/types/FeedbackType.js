const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const FeedbackType = new GraphQLObjectType({
    name: 'Feedback',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
    }),
});

module.exports = FeedbackType;