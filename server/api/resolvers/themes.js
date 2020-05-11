const { UserInputError } = require("apollo-server-express");

const Theme = require("../../models/Theme");

module.exports = {
  Query: {
    themes: () => Theme.find(),
  },
  Mutation: {
    addTheme: async (
      _,
      { themeInput: { name, description, start_date, end_date, author } }
    ) => {
      // Field validation
      if (!name || !description || !start_date || !end_date || !author) {
        throw new UserInputError("Please enter all fields", {
          errors: "Please enter all fields",
        });
      }

      // Check if record exists
      const checkTheme = await Theme.findOne({ name });

      if (checkTheme) {
        throw new UserInputError("Theme name already exists", {
          errors: "Theme name already exists",
        });
      }

      // Create Theme object, save to DB
      const newTheme = new Theme({
        name,
        description,
        start_date,
        end_date,
        author,
        status: "active",
      });

      const res = await newTheme.save();
      newTheme.theme_id = res._id;

      return res;
    },
  },
};
