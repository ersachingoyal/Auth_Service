'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [3,300] //between 3 to 300 characters
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {  // the user object here is the user that we will get after the user is created, this function will run before actually the user is created
    const encryptesPassword = bcrypt.hashSync(user.password, SALT); //salt is an extra layer of data over the encryption algorithm
    user.password = encryptesPassword;
  })

  return User;
};