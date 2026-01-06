import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    users: (parent, args, context) => {
      const { req } = context;

      return users;
    },

    user: (parent, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },

  Mutation: {},
};

export default userResolver;
