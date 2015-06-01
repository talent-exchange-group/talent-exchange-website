var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');
var bcrypt = require('bcrypt');
var skillSpec = require('./API/SkillAPISpec');
var locSpec = require('./API/LocationAPISpec');
var indSpec = require('./API/IndividualAPISpec');
var orgSpec = require('./API/OrganizationAPISpec');

describe('API', function(){
  skillSpec();
  locSpec();
  indSpec();
  orgSpec();
});

