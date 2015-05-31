var Skill = require('../models/Skill');

var controller = {
  add: function(skillName, callback){
    skillName = standardizeInput(skillName);
    this.getId(skillName, function(found){
      if(found.id === -1){
        Skill.create({name: skillName}).then(function(skill){
          callback(removeTimeStamps(skill));
        });
      }
      else {
        found['name'] = skillName;
        callback(found);
      }
    });
  },
  getId: function(skillName, callback){
    skillName = standardizeInput(skillName);
    var query = {where: {name: skillName}};
    Skill.findOne(query).then(function(skill){
      if (skill === null){
        callback({id: -1});
      }
      else callback({id: skill.id});
    });
  },
  getAll: function(callback){
    Skill.findAll({}, {subQuery: false}).then(function(skills){
      callback(skills.map(removeTimeStamps));
    });
  },
  remove: function(skillName, callback){
    skillName = standardizeInput(skillName);
    var query = {where: {name: skillName}};
    Skill.findOne(query).then(function(skill){
      skill.destroy().then(function(){
        callback(skill);
      });
    });
  }
}

function removeTimeStamps(obj){
  delete obj['createdAt'];
  delete obj['updatedAt'];
  return obj;
}

function standardizeInput(skillName){
  return skillName.toLowerCase().trim();
}

module.exports = controller;