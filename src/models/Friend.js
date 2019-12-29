import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  consent: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Friend", FriendSchema);
export default model;
