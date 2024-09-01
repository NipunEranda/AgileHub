import mongoose from "mongoose";

export async function connectMongoose() {
  if (process.env.MONGO_URL && process.env.MONGO_DB) {
    // console.log("Connected to mongodb!");
    await mongoose.connect(
      `${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&`
    );
  }
}

export async function closeMongooseConnection() {
  if (mongoose.connection) {
    // console.log("mongodb connection closed!");
    await mongoose.connection.close();
  }
}
