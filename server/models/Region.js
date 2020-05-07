import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  market_ids: {
    type: Array,
    required: true,
  },
  keywords: {
    type: Array,
    required: true,
  },
});

const Region = mongoose.model("Region", RegionSchema);

export default Region;
