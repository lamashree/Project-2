module.exports = function (sequelize, DataTypes) {
  var Bids = sequelize.define("Bids", {
    bidValue: {
      type: DataTypes.DECMIAL(10, 2),
      allowNull: false
    }
  });

  Bids.associate = function (models) {
    Bids.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Bids.associate = function (models) {
    Bids.belongsTo(models.Items, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bids;
};