import { Schema, model } from "mongoose";

export interface _User {
  _id: string;
  avatar_url: string;
  bio: string;
  company: string;
  created_at: string;
  email: string;
  followers: number;
  following: number;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  public_repos: number;
  type: string;
  workspaces: string[];
}

export interface _Login {
  token: string;
  user: _User;
}

// Classes
export class Login {
  token: string;
  user: _User;

  constructor(obj: _Login) {
    this.token = obj.token;
    this.user = obj.user;
  }
}

export class User {
  _id: string;
  avatar_url: string;
  bio: string;
  company: string;
  created_at: string;
  email: string;
  followers: number;
  following: number;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  public_repos: number;
  type: string;
  workspaces: string[];

  constructor(
    _id: string,
    avatar_url: string,
    bio: string,
    company: string,
    created_at: string,
    email: string,
    followers: number,
    following: number,
    html_url: string,
    id: number,
    location: string,
    login: string,
    name: string,
    public_repos: number,
    type: string,
    workspaces: string[]
  ) {
    this._id = _id;
    this.avatar_url = avatar_url;
    this.bio = bio;
    this.company = company;
    this.created_at = created_at;
    this.email = email;
    this.followers = followers;
    this.following = following;
    this.html_url = html_url;
    this.id = id;
    this.location = location;
    this.login = login;
    this.name = name;
    this.public_repos = public_repos;
    this.type = type;
    this.workspaces = workspaces;
  }

  static createObject(obj: _User) {
    return new User(
      obj._id,
      obj.avatar_url,
      obj.bio,
      obj.company,
      obj.created_at,
      obj.email,
      obj.followers,
      obj.following,
      obj.html_url,
      obj.id,
      obj.location,
      obj.login,
      obj.name,
      obj.public_repos,
      obj.type,
      obj.workspaces
    );
  }

  static createEmptyObject() {
    return new User(
      "",
      "",
      "",
      "",
      "",
      "",
      0,
      0,
      "",
      0,
      "",
      "",
      "",
      0,
      ",",
      []
    );
  }
}

const UserSchema: Schema = new Schema({
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
