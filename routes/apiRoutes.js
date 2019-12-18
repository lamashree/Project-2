var db = require("../models");

module.exports = function(app) {
  // Get all items
  app.get("/api/items", function(req, res) {
    db.Items.findAll({}).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  // Create a new item
  app.post("/api/items", function(req, res) {
    db.Items.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Delete an item by id
  app.delete("/api/items/:id", function(req, res) {
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

  // Get all bids for an item
  app.get("/api/items/:id/bids", function(req, res) {
    db.Bids.findAll({ where: { ItemId: req.params.id } }).then(function(dbBids) {
      res.json(dbBids);
    });
  });
};
