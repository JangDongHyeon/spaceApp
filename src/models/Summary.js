import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  summary: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  regdate: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Summary", SummarySchema);
export default model;
