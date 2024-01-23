const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLScalarType } = require('graphql');
const UserType = require('./UserType');

const AssignmentType = new GraphQLObjectType({
    name: 'Assignment',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        dueDate: { 
            type: new GraphQLScalarType({
                name: 'Date',
                serialize(value) {
                    return value.toISOString(); // Convert Date to ISO String format
                },
            }),
        },
        postedBy: { type: UserType },
    }),
});

module.exports = AssignmentType;
