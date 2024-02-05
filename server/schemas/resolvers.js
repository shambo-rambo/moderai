// Resolvers 
const { User, Assignment, MarkingCriteria, Essay, Comment } = require('../models');
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
        },
        essays: async () => {
            return Essay.find();
        },
        essay: async (_, { _id }) => {
            try {
                const essay = await Essay.findById(_id);
                if (!essay) {
                    throw new Error(`Essay with ID ${_id} not found.`);
                }
                return essay;
            } catch (error) {
                console.error(`Error fetching essay with ID ${_id}:`, error);
                throw new Error(error.message);
            }
        },
        commentsByEssay: async (_, { essayId }) => {
            return await Comment.find({ essayId }).populate('userId');
          },
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
        addEssay: async (parent, { input }) => {
            const { assignmentId, text } = input;
            // Create a new essay
            const essay = new Essay({ assignmentId, text });
            const savedEssay = await essay.save(); // Save the essay and get the saved instance
            
            // Find the corresponding assignment and update it with the new essay's ID
            const assignment = await Assignment.findById(assignmentId); // Find the assignment by ID
            if (!assignment) {
                throw new Error('Assignment not found');
            }
            assignment.essays.push(savedEssay._id); // Add the new essay's ID to the assignment's essays array
            await assignment.save(); // Save the updated assignment
            
            return savedEssay; // Return the saved essay
        },
        submitComment: async (parent, { essayId, text, userId }) => {
            const comment = new Comment({ essayId, text, userId });
            return await comment.save();
        }
    }
};

module.exports = resolvers;