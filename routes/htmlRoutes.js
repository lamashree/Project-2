var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Items.findAll({}).then(function(dbItems) {
      res.render("index", {
        title: "CAJARILLA MARKETPLACE",
        Items: dbItems
      });
    });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.get("/chat", function(req, res) {
    res.render("chat");
  });

  // Load example page and pass in an example by id
  app.get("/item/:id", function(req, res) {
    db.Items.findOne({ where: { id: req.params.id } }).then(function(dbItem) {
      res.render("item", {
        Items: dbItem
      });
    });
  });

  // Load the create item page
  app.get("/post-item", function(req, res) {
    res.render("postItem");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
