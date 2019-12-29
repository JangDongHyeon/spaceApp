import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend"
    }
  ],
  summarys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Summary"
    }
  ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const model = mongoose.model("User", UserSchema);

export default model;
