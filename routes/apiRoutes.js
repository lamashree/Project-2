var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/items", function(req, res) {
    db.Items.findAll({}).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  // Create a new example
  app.post("/api/items", function(req, res) {
    db.Items.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Delete an example by id
  app.delete("/api/items/:id", function(req, res) {
    db.Items.destroy({ where: { id: req.params.id } }).then(function(dbItem) {
      res.json(dbItem);
    });
  });
};
