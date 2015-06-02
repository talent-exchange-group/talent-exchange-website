var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');
var bcrypt = require('bcrypt');

function spec(){

  describe('Organization', function(){
    
    var orgId;
    var orgObj = {
      email: 'jg3043@nyu.edu',
      password: 'bigapple',
      name: 'Jimmytonic',
      location: 'new york city'
    };

    it('should add organization to database', function(done){
      request.post('/api/organization/create')
        .send(orgObj)
        .end(function(err, res){
          var addedOrg = JSON.parse(res.text);
          orgId = addedOrg.id;
          expect(addedOrg.email).to.equal(orgObj.email);
          expect(addedOrg.name).to.equal(orgObj.name);
          expect(addedOrg.location).to.equal(orgObj.location);
          done();
        });
    });
    it('should retrieve all organizations from the database', function(done){
      request.get('/api/organization/all')
      .end(function(err, res){
        var organizations = JSON.parse(res.text);
        expect(organizations[0].email).to.equal(orgObj.email);
        done();
      });
    });
    it('should retrieve the id of an organization in database by email', function(done){
      request.get('/api/organization/email=jg3043@nyu.edu')
        .end(function(err, res){
          var organization = JSON.parse(res.text);
          expect(organization.id).to.equal(orgId);
          done();
        });
    });
    it('should retrieve all organizations filtered by name', function(done){
      request.get('/api/organization/name=Jimmytonic')
        .end(function(err, res){
          var organizations = JSON.parse(res.text);
          expect(organizations[0].id).to.equal(orgId);
          done();
        });
    });
    it('should retrieve all organizations filtered by location', function(done){
      request.get('/api/organization/location=New York City')
        .end(function(err, res){
          var organizations = JSON.parse(res.text);
          expect(organizations[0].id).to.equal(orgId);
          done();
        });
    });
    it('should remove organizations', function(done){
      request.post('/api/organization/remove')
        .send(orgObj)
        .end(function(err, res){
          var removedOrg = JSON.parse(res.text);
          expect(removedOrg.id).to.equal(orgId);
          done();
        });
    });
    it('should return -1 for non-existing organization', function(done){
      request.get('/api/organization/email=jg3043@nyu.edu')
        .end(function(err, res){
          var organization = JSON.parse(res.text);
          expect(organization.id).to.equal(-1);
          done();
        });
    });

  });
}

module.exports = spec;