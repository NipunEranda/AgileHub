const { login } = require("../services/auth");

exports.authInit = (prefix, app) => {
  app.get(`${prefix}/auth/login/:code`, async (req, res) => {
    await login(req, res);
  });
  app.get(`${prefix}/auth`, async (req, res) => {
    res.status(200).json({ success: true });
  });
};
