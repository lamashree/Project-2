module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("users", {
      id: {
        type: DataTypes.INT,
        allowNull: false,
        validate: {
          len: [1]
        },
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [50]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [50]
        }
      },
      emalAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [50]
        }
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [50]
        }
      },
      addressStreet: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [50]
        }
      },
      addressState: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [50]
        }
      },
      addressZipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [50]
        }
      },
      phoneNumber: {
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
    Users.associate = function(models) {
      Users.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Bids;
  };  