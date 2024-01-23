const { GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');
const Assignment = require('../../models/Assignment');
const AssignmentType = require('../types/AssignmentType');

const assignmentResolvers = {
    Query: {
        assignment: {
            type: AssignmentType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args) => {
                return await Assignment.findById(args.id);
            },
        },
        assignments: {
            type: new GraphQLList(AssignmentType),
            resolve: async () => {
                return await Assignment.find({});
            },
        },
    },
    Mutation: {
        addAssignment: {
            type: AssignmentType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) }, 
                description: { type: GraphQLString },
                markingCriteria: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                let assignment = new Assignment({
                    title: args.title,
                    description: args.description,
                });
                return await assignment.save();
            },
        },
    },
};

module.exports = assignmentResolvers;
