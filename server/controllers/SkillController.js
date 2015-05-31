var Skill = require('../models/Skill');
var utils = require('../helpers/utils');

var controller = {
  getId: function(skillName, callback){
    skillName = utils.standardizeInput(skillName);
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
      skills = skills.map(utils.removeTimeStamps);
      callback(skills);
    });
  },
  add: function(skillName, callback){
    skillName = utils.standardizeInput(skillName);
    this.getId(skillName, function(found){
      if(found.id === -1){
        Skill.create({name: skillName}).then(function(skill){
          callback(utils.removeTimeStamps(skill));
        });
      }
      else {
        found['exists'] = true;
        callback(found);
      }
    });
  },
  remove: function(skillName, callback){
    skillName = utils.standardizeInput(skillName);
    var query = {where: {name: skillName}};
    Skill.findOne(query).then(function(skill){
      skill.destroy().then(function(){
        callback(skill);
      });
    });
  }
}

module.exports = controller;