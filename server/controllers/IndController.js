var Individual = require('../models/Individual');
var bcrypt = require('bcrypt');

var controller = {
  add: function(email, password, name, callback){
    var indObj = {
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: name
    };
    Individual.create(indObj).then(function(ind){
      callback({
        id: ind.id,
        email: ind.email,
        name: ind.name
      });
    });
  }
};

module.exports = controller;