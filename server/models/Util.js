import mongoose, { mongo } from "mongoose";

export const connectMongoose = async () => {
  if (process.env.MONGO_URL && process.env.MONGO_DB) {
    // console.log("Connected to mongodb!");
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&`);
  }
};

export const closeMongooseConnection = async () => {
  if (mongoose.connection) {
    // console.log("mongodb connection closed!");
    await mongoose.connection.close();
  }
};