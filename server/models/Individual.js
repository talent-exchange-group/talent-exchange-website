var Sequelize = require('sequelize');
var db = require('../db');
var Skill = require('./Skill');

var Individual = db.define('Individual', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING
});

IndividualSkill = db.define('IndividualSkill', {
  id: { type: Sequelize.INTEGER, autoIncrement true, primaryKey: true }
});
Individual.hasMany(Skill, { through: IndividualSkill });
Skill.hasMany(Individual, { through: IndividualSkill });

/**
 * Create table if doesn't exist
 */
Individual.sync();

module.exports = Individual;