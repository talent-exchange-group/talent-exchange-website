var Individual = require('../models/Individual');
var bcrypt = require('bcrypt');
var utils = require('../helpers/utils');

var controller = {
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
  }
};

module.exports = controller;