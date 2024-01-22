const { GraphQLID, GraphQLList, GraphQLString } = require('graphql');
const User = require('../../models/User');
const UserType = require('../types/UserType');

const userResolvers = {
  Query: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        return await User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return await User.find({});
      },
    },
  },
  Mutation: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }, // Add this line
      },
      resolve: async (parent, args) => {
        let user = new User({
          username: args.username,
          email: args.email,
          password: args.password, // Include the password here
        });
        return await user.save();
      },
    },
  },
};

module.exports = userResolvers;
