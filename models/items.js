module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("items", {
      id: {
        type: DataTypes.INT,
        allowNull: false,
        validate: {
          len: [1]
        },
        primaryKey: true,
        autoIncrement: true
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [20]
        }
      },
      itemCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [200]
        }
      },
      itemState: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [20]
        },
        itemPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            len: [20]
          }
        },
        itemId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            len: [20]
          }
        }
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  
    Items.associate = function(models) {
      Items.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Items;
  };  