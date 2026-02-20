let applications = [];

module.exports = {
  getAll: () => applications,
  add: (app) => applications.push(app)
};
