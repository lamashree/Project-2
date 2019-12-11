module.exports = function (sequelize, DataTypes) {
  var Items = sequelize.define("items", {
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
    itemState: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    itemPrice: {
      type: DataTypes.DECMIAL(10, 2),
      allowNull: false
    },
    itemPhoto: {
      type: DataTypes.TEXT
    }
  });

  Items.associate = function (models) {
    Items.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Items;
};  