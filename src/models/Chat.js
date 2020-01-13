import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
const ChatSchema = new mongoose.Schema({
  content: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
    index: true
  },
  sentiment: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
autoIncrement.initialize(mongoose.connection);
ChatSchema.plugin(autoIncrement.plugin, {
  model: "Chat",
  field: "id",
  startAt: 1,
  incrementBy: 1,
  index: true
});
const model = mongoose.model("Chat", ChatSchema);
export default model;
