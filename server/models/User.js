import mongoose, { ObjectId, Schema, model } from "mongoose";

  const UserSchema = new Schema({
    avatar_url: {
      type: String,
      required: false,
      unique: false,
    },
    bio: {
      type: String,
      required: false,
      unique: false,
    },
    company: {
      type: String,
      required: false,
      unique: false,
    },
    created_at: {
      type: String,
      required: false,
      unique: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    followers: {
      type: Number,
      required: false,
      unique: false,
    },
    following: {
      type: Number,
      required: false,
      unique: false,
    },
    html_url: {
      type: String,
      required: false,
      unique: false,
    },
    id: {
      type: Number,
      required: false,
      unique: false,
    },
    location: {
      type: String,
      required: false,
      unique: false,
    },
    login: {
      type: String,
      required: false,
      unique: false,
    },
    name: {
      type: String,
      required: false,
      unique: false,
    },
    public_repos: {
      type: Number,
      required: false,
      unique: false,
    },
    type: {
      type: String,
      required: false,
      unique: false,
    },
    workspaces: {
      type: Array,
      required: false,
      unique: false,
    },
  });
  
  UserSchema.index({ id: 1 });
  
  // Create github user schema
  const userSchema = model("user", UserSchema);

  export default userSchema;