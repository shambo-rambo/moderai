const { GraphQLID, GraphQLList, GraphQLString } = require('graphql');
const User = require('../../models/User');
const UserType = require('../types/UserType');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let hashedPassword = await bcrypt.hash(args.password, 12);
        let user = new User({
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: hashedPassword,
        });
        try {
        return await user.save();
        }
        catch(err) {
          throw new Error(error.message);
        }
      },
    },

    loginUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error('User does not exist!');
        }
        let isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        let token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1h',
          },
        );
        return { 
          userId: user.id, 
          token: token, tokenExpiration: 1 };
      },
    },
  },
};

module.exports = userResolvers;
