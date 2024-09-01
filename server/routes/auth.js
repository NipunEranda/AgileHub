const { userSchema } = require("../models/User");
const { closeMongooseConnection, connectMongoose } = require("../models/Util");
const { login, logout } = require("../services/auth");

exports.authInit = (prefix, app) => {
  app.get(`${prefix}/auth/login/:code`, async (req, res) => {
    await login(req, res);
  });

  app.get(`${prefix}/auth/logout`, async (req, res) => {
    await logout(req, res);
  });

  app.get(`${prefix}/auth`, async (req, res) => {
    res.status(200).send({ success: true });
  });

  app.get(`${prefix}/auth/users`, async (req, res) => {
    try {
      await connectMongoose();
      const users = await userSchema.find();
      res.status(200).send(users);
    } catch (e) {
      console.log(e);
      res.status(500).send({ data: null, error: e });
    } finally {
      await closeMongooseConnection();
    }
  });
};
