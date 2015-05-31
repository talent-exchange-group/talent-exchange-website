var Sequelize = require('sequelize');
var db = require('../db');
var Skill = require('./Skill');

var Individual = db.define('Individual', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING
});

IndividualSkill = db.define('IndividualSkill', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
});
Individual.belongsToMany(Skill, {
  through: IndividualSkill,
  foreignKey: 'individual_id' 
});
Skill.belongsToMany(Individual, {
  through: IndividualSkill,
  foreignKey: 'skill_id'
});
/**
 * Create table if doesn't exist
 */
Individual.drop({cascade:true});
Individual.sync({force:true});

module.exports = Individual;