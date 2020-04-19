require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var JAWS_DB = process.env.JAWSDB_URL;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = { }
io.on("connection", function(socket) {
    socket.emit("chat-message", "Hello")
    socket.on("new-user", name=> {
console.log(name)
        users[socket.id] - name
        socket.broadcast.emit("user-connected")
    })
  
    socket.on("sent-chat-message", message)
    console.log(message)
    socket.broadcast.emit("chat-message", {message:message, name:user[socket.id]})

    socket.on("disconnect", () =>{
        socket.broadcast.emit("user-disconnected", users[socket.id])
       delete user[socket.id]

    })

})

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
