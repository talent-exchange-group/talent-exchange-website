var Individual = require('../models/Individual');
var bcrypt = require('bcrypt');
var utils = require('../helpers/utils');

var controller = {
  getId: function(email, callback){
    var query = {where: {email: email}};
    Individual.findOne(query).then(function(individual){
      if (individual === null){
        callback({id: -1});
      }
      else callback({id: individual.id});
    });
  },
  getByName: function(name, callback){
    var query = {where: {name: name}};
    Individual.findAll(query, {subQuery: false}).then(function(individuals){
      individuals = individuals.map(utils.protectUserObj);
      callback(individuals);
    });
  },
  getAll: function(callback){
    Individual.findAll({}, {subQuery: false}).then(function(individuals){
      individuals = individuals.map(utils.protectUserObj);
      callback(individuals);
    });
  },
  add: function(email, password, name, callback){
    var indObj = {
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: name
    };
    Individual.create(indObj).then(function(ind){
      ind = utils.protectUserObj(ind);
      callback(ind);
    });
  },
  remove: function(email, callback){
    var query = {where: {email: email}};
    Individual.findOne(query).then(function(individual){
      individual.destroy().then(function(){
        callback(utils.protectUserObj(individual));
      });
    });
  }
};

module.exports = controller;