exports.projectInit = (prefix, app) => {
  app.get(`${prefix}/project`, async (req, res) => {
    res.status(200).send([]);
  });
};
