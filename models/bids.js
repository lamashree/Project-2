module.exports = function(sequelize, DataTypes) {
    var Bids = sequelize.define("bids", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        },
        primaryKey: true,
        autoIncrement: true
      },
      bidValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [20]
        }
      },
      userId: {
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
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  
    Bids.associate = function(models) {
      Bids.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Bids;
  };  