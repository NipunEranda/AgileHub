import mongoose from "mongoose";

// Interfaces
export interface _Project {
  _id: string;
  name: string;
  key: string;
  type: number;
  category: number;
  lead: number;
  url: string;
  isDeleted: boolean;
}

export interface ProjectDocument extends _Project, mongoose.Document {
  _id: string;
  name: string;
  key: string;
  type: number;
  category: number;
  lead: number;
  url: string;
  isDeleted: boolean;
}

export const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  key: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: Number,
    required: true,
    unique: false,
  },
  category: {
    type: Number,
    required: true,
    unique: false,
  },
  lead: {
    type: Number,
    required: true,
    unique: false,
  },
  url: {
    type: String,
    required: false,
    unique: false,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    unique: false,
  },
});

// Create Workspace schema
export const projectSchema = mongoose.model<_Project>("Project", ProjectSchema);
