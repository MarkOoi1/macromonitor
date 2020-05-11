const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const config = require("../../../config/keys");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = {
  Mutation: {
    login: async (_, { loginInput: { email, password, google } }) => {
      // TODO: Validation on React end to ensure the google token is valid
      if (!password && !google) {
        throw new UserInputError("Please enter all fields", {
          errors: "The password was empty or the SSO failed",
        });
      } else if (!email) {
        throw new UserInputError("Please enter all fields", {
          errors: "Please enter all fields",
        });
      }

      // Validate if User exists?
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError("User does not exist", {
          errors:
            "User does not exist. Please sign up if you wish to use this email address",
        });
      }

      // If the user doesn't have a password property, they signed up using SSO and they haven't set a password.
      if (password && !user.hasOwnProperty("password")) {
        throw new UserInputError(
          "Please use your social media account to sign in",
          {
            errors: "Invalid credentials",
          }
        );
      }

      // If a password exists in the user profile, validate it.
      if (password && user.hasOwnProperty("password")) {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              throw new UserInputError("Invalid credentials", {
                errors: "Invalid credentials",
              });
            }
          })
          .catch((err) => console.log(err));
      }

      const token = jwt.sign({ id: user._id }, config.jwtSecret, {
        expiresIn: 86400,
      });

      return {
        token,
        user,
      };
    },
  },
};
