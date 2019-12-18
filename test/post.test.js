var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("POST /api/items", function() {
  this.beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save an item", function(done) {
    var reqBody = {
      itemName: "Example Item",
      itemCategory: "Technology",
      itemDescription: "A brand new technology item.",
      itemState: "New",
      itemPrice: 14.25,
      itemPhoto: "examplelink",
      userName: "testUser"
    };

    request
      .post("/api/items")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        done();
      });
  });
});
