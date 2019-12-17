var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("GET /api/items", function() {
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all items", function(done) {
    db.Items.bulkCreate([
      {
        itemName: "First Example",
        itemCategory: "First Description",
        itemDescription: "First Description",
        itemState: "First Item State",
        itemPrice: 10.0,
        itemPhoto: "First Item Photo",
        userName: "First User Name"
      },
      {
        itemName: "Second Example",
        itemCategory: "Second Description",
        itemDescription: "Second Description",
        itemState: "Second Item State",
        itemPrice: 20.0,
        itemPhoto: "Second Item Photo",
        userName: "Second User Name"
      }
    ]).then(function() {
      request.get("/api/items").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            itemName: "First Example",
            itemCategory: "First Description",
            itemDescription: "First Description",
            itemState: "First Item State",
            itemPrice: 10.0,
            itemPhoto: "First Item Photo",
            userName: "First User Name"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            itemName: "Second Example",
            itemCategory: "Second Description",
            itemDescription: "Second Description",
            itemState: "Second Item State",
            itemPrice: 20.0,
            itemPhoto: "Second Item Photo",
            userName: "Second User Name"
          });

        done();
      });
    });
  });
});
