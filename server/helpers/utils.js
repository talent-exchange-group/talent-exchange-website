var Skill = require('Skill');

var utils = {
  getSkillId: function(skill, callback){
    var query = {where: {name: skill}};
    Skill.findOne(query).then(function(skill){
      console.log(skill);
    });
  },
  addSkill: function(skill){
    Skill.create({name: skill}).then(function(skill){
      console.log(skill);
    });
  }
}

module.exports = utils;