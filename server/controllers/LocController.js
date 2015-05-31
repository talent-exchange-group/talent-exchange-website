var Location = require('../models/Location');
var utils = require('../helpers/utils');

var controller = {
  getId: function(locName, callback){
    locName = utils.standardizeInput(locName);
    var query = {where: {name: locName}};
    Location.findOne(query).then(function(location){
      if (location === null){
        callback({id: -1});
      }
      else callback({id: location.id});
    });
  },
  getAll: function(callback){
    Location.findAll({}, {subQuery: false}).then(function(locations){
      locations = locations.map(utils.removeTimeStamps);
      callback(locations);
    });
  },
  add: function(locName, callback){
    locName = utils.standardizeInput(locName);
    this.getId(locName, function(found){
      if(found.id === -1){
        Location.create({name: locName}).then(function(location){
          callback(utils.removeTimeStamps(location));
        });
      }
      else {
        found['exists'] = true;
        callback(found);
      }
    });
  },
  remove: function(locName, callback){
    locName = utils.standardizeInput(locName);
    var query = {where: {name: locName}};
    Location.findOne(query).then(function(location){
      location.destroy().then(function(){
        callback(utils.removeTimeStamps(location));
      });
    });
  }
};

module.exports = controller;