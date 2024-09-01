const mongoose = require("mongoose");

exports.connectMongoose = async () => {
  if (process.env.MONGO_URL && process.env.MONGO_DB) {
    // console.log("Connected to mongodb!");
    await mongoose.connect(
      `${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&`
    );
  }
};

exports.closeMongooseConnection = async () => {
  if (mongoose.connection) {
    // console.log("mongodb connection closed!");
    await mongoose.connection.close();
  }
};
