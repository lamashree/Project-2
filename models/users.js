module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    }
  });

  // Users.associate = function(models) {
  //   Users.hasMany(models.Items, {
  //     onDelete: "cascade"
  //   });
  // };

  return Users;
};