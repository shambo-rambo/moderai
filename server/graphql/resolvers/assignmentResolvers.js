const { GraphQLID, GraphQLList, GraphQLString } = require('graphql');
const Assignment = require('../../models/Assignment');
const AssignmentType = require('../types/AssignmentType');

const assignmentResolvers = {
    Query: {
        assignment: {
        type: AssignmentType,
        args: { id: { type: GraphQLID } },
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
            title: { type: GraphQLString }, 
        },
        resolve: async (parent, args) => {
            let assignment = new Assignment({
            title: args.title,
            });
            return await assignment.save();
        },
        },
    },
    };