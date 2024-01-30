const { User, Assignment, MarkingCriteria } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, args) => {
            return await User.findOne({ _id: args._id });
        },
        assignments: async () => {
            return Assignment.find();
        },
        assignment: async (parent, args) => {
            return await Assignment.findOne({ _id: args._id });
        }
    },
    Mutation: {
        addUser: async (parent, { input }) => {
            const user = await User.create(input);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('Incorrect credentials');
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Incorrect credentials');
            const token = signToken(user);
            return { token, user };
        },
        addAssignment: async (parent, { input }) => {
            const { title, instructions, subjectGroup, markingCriteriaInput } = input;
            const assignment = new Assignment({ title, instructions, subjectGroup });
            
            // Save the assignment
            await assignment.save();

            // If marking criteria are provided, save them and associate with the assignment
            if (markingCriteriaInput && markingCriteriaInput.length > 0) {
                for (const criteria of markingCriteriaInput) {
                    const newCriteria = new MarkingCriteria({ 
                        title: criteria.title, 
                        description: criteria.description, 
                        assignment: assignment._id 
                    });
                    await newCriteria.save();
                    assignment.markingCriteria.push(newCriteria._id);
                }
            }

            // Save the assignment again after adding marking criteria
            await assignment.save();

            return assignment;
        },  
    }
};

module.exports = resolvers;