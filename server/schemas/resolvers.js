// Resolvers.js
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, args) => {
            return await User.findOne({ _id: args._id });
        },
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
        }
    }
};

module.exports = resolvers;
