var Skill = require('../models/Skill');

var utils = {
  getSkillId: function(skill, callback){
    var query = {where: {name: skill}};
    Skill.findOne(query).then(function(skill){
      console.log(skill);
    });
  },
  addSkill: function(skill, callback){
    Skill.create({name: skill}).then(function(skill){
      callback({id: skill.id, name: skill.name});
    });
  }
}

module.exports = utils;