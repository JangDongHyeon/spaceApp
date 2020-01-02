import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
const RoomSchema = new mongoose.Schema({
  botLevel: {
    type: String,
    default: "max"
  },
  botMode: {
    type: String,
    default: "intent"
  },
  language: {
    type: String,
    default: "english"
  },
  owner: {
    type: String,
    required: true
  },

  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true
    }
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
    }
  ]
});

autoIncrement.initialize(mongoose.connection);
RoomSchema.plugin(autoIncrement.plugin, {
  model: "Room",
  field: "id",
  startAt: 1,
  incrementBy: 1,
  index: true
});
const model = mongoose.model("Room", RoomSchema);
export default model;
