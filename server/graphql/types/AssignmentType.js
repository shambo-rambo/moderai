const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const AssignmentType = new GraphQLObjectType({
    name: 'Assignment',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
    }),
});

module.exports = AssignmentType;