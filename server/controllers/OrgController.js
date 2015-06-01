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

  },
  getAll: function(callback){
    Organization.findAll({}, {subQuery: false}).then(function(organizations){
      organizations = organizations.map(utils.protectUserObj);
      callback(organizations);
    });
  },
  add: function(email, password, name, location, callback){
    var locId = null;
    var orgObj = {
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: name
    };
    Organization.create(orgObj).then(function(org){
      org = utils.protectUserObj(org);
      callback(org);
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