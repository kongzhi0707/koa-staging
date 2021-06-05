
const { gql } = require('apollo-server-koa');
const mongoose = require('mongoose');

const UserModel = mongoose.model('userInfo');
const InfoModel = mongoose.model("Info");

const typeDefs = gql`
  type Info {
    height: String,
    weight: String,
    love: String,
    userId: ID,
    _id: ID
  }
  type userInfo {
    name: String,
    sex: String,
    age: Int,
    _id: ID,
    info: Info
  }
  type Query {
    getUser: [userInfo],
    getUserInfo(id: ID): Info
    getInfo: [Info],
  }
  type Mutation {
    addUser(post: UserInput): userInfo
    addUserInfo(id: ID, height: String, weight: String, love: String): Info
    updateUserInfo(id: ID, height: String, weight: String, love: String): Info
  }
  input UserInput {
    name: String,
    age: Int,
    sex: String
  }
`;

const resolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      return UserModel.find({});
    },
    getUserInfo: async (parent, args, context, info) => {
      const ret = await InfoModel.find({userId: args.id});
      return ret[0];
    },
    getInfo: (parent, args, context, info) => {
      return InfoModel.find({});
    }
  },
  Mutation: {
    addUser: (parent, args, context) => {
      const { name, age, sex } = args.post;
      return UserModel.create({ name, age, sex });
    },
    addUserInfo: (parent, args, context) => {
      const {id, height, weight, love} = args;
      return InfoModel.create({ height, weight, love, userId: id });
    },
    updateUserInfo: (parent, args, context) => {
      const {id, height, weight, love} = args;
      return InfoModel.findOneAndUpdate({ userId: id }, { height, weight, love });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};

