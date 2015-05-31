var Skill = require('../models/Skill');

var controller = {
  attachParam: function(req, res,next, param){
    req.body = {}
  },
  getSkillByName: function(skillName, callback){
    var query = {where: {name: skillName}};
    Skill.findOne(query).then(function(skill){
      if (!skill){
        callback(null);
      }
      callback(removeTimeStamps(skill));
    });
  },
  addSkill: function(skillName, callback){
    Skill.create({name: skillName}).then(function(skill){
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

module.exports = controller;