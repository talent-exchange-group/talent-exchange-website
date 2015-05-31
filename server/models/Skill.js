var Sequelize = require('sequelize');
var db = require('../db');

var Skill = db.define('Skill', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING
});

/**
 * Create table if doesn't exist
 */
Skill.sync({force:true});

module.exports = Skill;