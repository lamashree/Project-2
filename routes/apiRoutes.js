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

  // Delete a bid by id
  app.delete("/api/bids/:id", function(req, res) {
    db.Bids.destroy({ where: { id: req.params.id } }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Get all bids for an item
  app.get("/api/items/:id/bids", function(req, res) {
    db.Bids.findAll({
      where: {
        ItemId: req.params.id
      },
      order: [["bidValue", "DESC"]]
    }).then(function(dbBids) {
      res.json(dbBids);
    });
  });

  // Update an item
  app.put("/api/items/:id/sold", function(req, res) {
    db.Items.update({ itemSold: true }, { where: { id: req.params.id } }).then(
      function(dbItem) {
        res.json(dbItem);
      }
    );
  });
};
