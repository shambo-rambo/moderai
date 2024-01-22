const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const GradingcriteriaType = new GraphQLObjectType({
    name: 'Gradingcriteria',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
    }),
});

module.exports = GradingcriteriaType;