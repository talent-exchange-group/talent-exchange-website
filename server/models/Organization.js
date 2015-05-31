var Sequelize = require('sequelize');
var db = require('../db');
var Location = require('./Location');
var Skill = require('./Skill');

var Organization = db.define('Organization', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  contact: Sequelize.STRING
});

Organization.belongsTo(Location, { foreignKey: 'location_id'});

OrganizationSkill = db.define('OrganizationSkill', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
});
Organization.belongsToMany(Skill, {
  through: OrganizationSkill,
  foreignKey: 'organization_id' 
});
Skill.belongsToMany(Organization, {
  through: OrganizationSkill,
  foreignKey: 'skill_id'
});
/**
 * Create table if doesn't exist
 */
Organization.sync({force:true});

module.exports = Organization;