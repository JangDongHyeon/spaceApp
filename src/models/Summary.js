import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
const SummarySchema = new mongoose.Schema({
  summary: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  },
  regdate: {
    type: Date,
    default: Date.now
  }
});
autoIncrement.initialize(mongoose.connection);
SummarySchema.plugin(autoIncrement.plugin, {
  model: "Summary",
  field: "id",
  startAt: 1,
  incrementBy: 1,
  index: true
});
const model = mongoose.model("Summary", SummarySchema);
export default model;
