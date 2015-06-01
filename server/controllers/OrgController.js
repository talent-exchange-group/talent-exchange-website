var Organization = require('../models/Organization');
var Location = require('../models/Location');
var bcrypt = require('bcrypt');
var utils = require('../helpers/utils');

var controller = {
  getId: function(email, callback){
    var query = {where: {email: email}};
    Organization.findOne(query).then(function(organization){
      if (organization === null){
        callback({id: -1});
      }
      else callback({id: organization.id});
    });
  },
  getByName: function(name, callback){
    var query = {where: {name: name}};
    Organization.findAll(query, {subQuery: false}).then(function(organizations){
      organizations = organizations.map(utils.protectUserObj);
      callback(organizations);
    });
  },
  getByLocation: function(location, callback){
    location = utils.standardizeInput(location);
    Organization.findAll({include: [{
        model: Location,
        where: {name: location}
      }]
    }).then(function(orgs){
      orgs = orgs.map(function(org){
        return utils.protectOrgObj(org, location);
      });
      callback(orgs);
    });
  },
  getAll: function(callback){
    Organization.findAll({}, {subQuery: false}).then(function(organizations){
      organizations = organizations.map(utils.protectUserObj);
      callback(organizations);
    });
  },
  add: function(email, password, name, location, callback){
    location = utils.standardizeInput(location);
    var orgObj = {
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: name
    };
    Location.findOrCreate({where: {name: location}}).then(function(loc){
      Organization.create(orgObj).then(function(org){
        org.setLocation(loc[0]);
        org = utils.protectOrgObj(org, location);
        callback(org);
      });
    });
  },
  remove: function(email, callback){
    var query = {where: {email: email}};
    Organization.findOne(query).then(function(organization){
      organization.destroy().then(function(){
        callback(utils.protectUserObj(organization));
      });
    });
  }
};

module.exports = controller;