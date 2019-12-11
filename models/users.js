module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    emailAddress: {
      type: DataTypes.STRING
    },
    userPassword: {
      type: DataTypes.STRING
    },
    addressStreet: {
      type: DataTypes.STRING
    },
    addressState: {
      type: DataTypes.STRING
    },
    addressZipcode: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [20]
      }
    }
  });

  Users.associate = function (models) {
    Users.hasMany(models.Items, {
      onDelete: "cascade"
    });
  };

  return Users;
};