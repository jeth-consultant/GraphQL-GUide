import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import pkg from "graphql-passport";
const { GraphQLLocalStrategy, buildContext } = pkg;

export const configurePassport = () => {
  /* -------------------- SERIALIZE / DESERIALIZE -------------------- */
  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user:", id);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  /* -------------------- LOCAL STRATEGY -------------------- */
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return done(null, false, { message: "Invalid username or password" });
        }

        return done(null, user); // Success
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
