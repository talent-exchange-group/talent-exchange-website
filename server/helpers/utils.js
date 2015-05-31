var Skill = require('../models/Skill');

var utils = {
  getSkillId: function(skill, callback){
    var query = {where: {name: skill}};
    Skill.findOne(query).then(function(skill){
      callback(removeTimeStamps(skill));
    });
  },
  addSkill: function(skill, callback){
    Skill.create({name: skill}).then(function(skill){
      callback(removeTimeStamps(skill));
    });
  },
  getAllSkills: function(callback){
    Skill.findAll({}, {subQuery: false}).then(function(skills){
      console.log(skills);
      callback(skills.map(removeTimeStamps));
    });
  }
}

function removeTimeStamps(obj){
  delete obj['createdAt'];
  delete obj['updatedAt'];
  return obj;
}

module.exports = utils;