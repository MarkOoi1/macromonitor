const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const config = require("../../../config/keys");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = {
  Query: {
    user: async (_, { email }) => {
      const user = await User.findOne({ email });

      return user;
    },
  },
  Mutation: {
    register: async (
      _,
      { registerInput: { name, email, password, google } }
    ) => {
      if (!password && !google) {
        throw new UserInputError("Please enter all fields", {
          errors: "The password was empty or the SSO failed",
        });
        //return res.status(400).json({ msg: "Please enter all fields" });
      } else if (!email || !name) {
        throw new UserInputError("Please enter all fields", {
          errors: "Please enter all fields",
        });
      }

      // Validate if User exists?
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("User already exists", {
          errors: "This email already exists in our database",
        });
      }

      const newUser = new User({
        name,
        email,
        password,
      });

      if (password) {
        const newpass = await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
          });
        });
      }

      const res = await newUser.save();

      const token = jwt.sign({ id: res._id }, config.jwtSecret, {
        expiresIn: 3600,
      });

      return {
        token,
        user: res,
      };
    },
  },
};
