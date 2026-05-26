// src/models/index.js
const sequelize = require('../config/database');
const User = require('./user')(sequelize);

console.log('User model:', typeof User); // Deve ser "function" ou "object"
console.log('User.findOne:', typeof User.findOne); // Deve ser "function"


module.exports = {
  sequelize,
  User
};