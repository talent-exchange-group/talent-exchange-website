var Sequelize = require('sequelize');

var uri = 'postgres://localhost:5432/';
var db = new Sequelize(uri, {
  logging: false
});

module.exports = db;