var db = require("../models");

module.exports = function(app) {
  // Get all items
  app.get("/api/items", function(req, res) {
    db.Items.findAll({}).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  // Load items page and pass in an item by id
  app.get("/api/item/:id", function(req, res) {
    db.Items.findOne({ where: { id: req.params.id } }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Create a new item
  app.post("/api/items", function(req, res) {
    db.Items.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Delete an item by id
  app.delete("/api/item/:id", function(req, res) {
    db.Items.destroy({ where: { id: req.params.id } }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Create a new bid
  app.post("/api/bids", function(req, res) {
    db.Bids.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });
};
