// Resolvers.js
const { User, Assignment } = require('../models');
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
        updateUser: async (parent, { _id, ...updateArgs }) => {
            const updatedUser = await User.findByIdAndUpdate(_id, updateArgs, { new: true });
            return updatedUser;
        },
        deleteUser: async (parent, { _id }) => {
            const deletedUser = await User.findByIdAndDelete(_id);
            return deletedUser;
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
            try {
              const newAssignment = await Assignment.create(input);
              return newAssignment;
            } catch (error) {
              console.error('Error adding assignment:', error);
              throw new Error(error.message);
            }
          }          
    }
};

module.exports = resolvers;
