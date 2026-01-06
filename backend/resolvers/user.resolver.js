import { users } from "../dummyData/data.js";
const userRseolver = {
  Query: {
    users: () => {
      return users;
    },
  },
  Mutation: {},
};

export default userRseolver;
