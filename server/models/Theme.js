const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  markets: [
    {
      code: String,
      type: String,
      direction: String,
      allocation: Number,
      currentPrice: Number,
      lowPrice: Number,
      targetPrice: Number,
      roi: Number,
      triangulation1: String,
      triangulation2: String,
      triangulation3: String,
    },
  ],
});

const Theme = mongoose.model("Theme", ThemeSchema);

module.exports = Theme;
