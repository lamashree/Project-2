module.exports = function (sequelize, DataTypes) {
  var Bids = sequelize.define("Bids", {
    bidValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id"
      }
    }
  });

  // Bids.associate = function(models) {
  //   Bids.belongsTo(models.Users, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Bids.associate = function (models) {
    Bids.belongsTo(models.Items, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bids;
};