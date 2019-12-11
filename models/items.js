module.exports = function (sequelize, DataTypes) {
  var Items = sequelize.define("Items", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    itemCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    itemDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    itemState: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    itemPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    itemPhoto: {
      type: DataTypes.TEXT
    }
  });

  Items.associate = function (models) {
    Items.belongsTo(models.Users, {
      foreignKey: "UserId",
      allowNull: false
    });
  };

  return Items;
};
