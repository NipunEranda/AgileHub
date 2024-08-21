const { login } = require("../services/auth");

exports.authInit = (prefix, server) => {
  server.get(`${prefix}/auth/login/:code`, async (req, res) => {
    await login(req.params.code)
    res.status(200).json({});
  });
};
