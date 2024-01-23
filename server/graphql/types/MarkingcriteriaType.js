const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const AssignmentType = require('./AssignmentType'); 

const MarkingCriteriaType = new GraphQLObjectType({
    name: 'MarkingCriteria',
    fields: () => ({
        id: { type: GraphQLID },
        assignment: { 
            type: AssignmentType, // Reference to Assignment
            description: "Assignment associated with the marking criteria"
        },
        criteria: { 
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)), // Array of criteria
            description: "List of marking criteria"
        }
    }),
});

module.exports = MarkingCriteriaType;
