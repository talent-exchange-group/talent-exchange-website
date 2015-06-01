var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');
var bcrypt = require('bcrypt');

describe('API', function(){
  /**
   * TEST FOR LOCATION API
   */
  describe('Location', function(){
    var locId;
    var locObj = {location: 'beirut'};

    it('should add a location to database', function(done){
      request.post('/api/location/create')
        .send(locObj)
        .end(function(err, res){
          var addedLoc = JSON.parse(res.text);
          locId = addedLoc.id;
          expect(addedLoc.name).to.equal(locObj.location);
          done();
        });
    });
    it('should not add duplicate entries', function(done){
      request.post('/api/location/create')
        .send(locObj)
        .end(function(err, res){
          var addedLoc = JSON.parse(res.text);
          expect(addedLoc.exists).to.equal(true);
          done();
        });
    });
    it('should retrieve all location from database', function(done){
      request.get('/api/location/all')
        .end(function(err, res){
          var locs = JSON.parse(res.text);
          expect(locs[0].name).to.equal(locObj.location);
          done();
        });
    });
    it('should retrieve the id of a location', function(done){
      request.get('/api/location/name=beirut')
        .end(function(err, res){
          var loc = JSON.parse(res.text);
          expect(loc.id).to.equal(locId);
          done();
        });
    });
    it('should standardize input by casing and whitespace', function(done){
      request.get('/api/location/name=Beirut')
        .end(function(err, res){
          var loc = JSON.parse(res.text);
          expect(loc.id).to.equal(locId);
          done();
        });
    });
    it('should remove specified locations from database', function(done){
      request.post('/api/location/remove')
        .send(locObj)
        .end(function(err, res){
          var removedLoc = JSON.parse(res.text);
          expect(removedLoc.id).to.equal(locId);
          done();
        });
    });
    it('should not retrieve non-existent locations', function(done){
      request.get('/api/location/name=beirut')
        .end(function(err, res){
          var loc = JSON.parse(res.text);
          expect(loc.id).to.equal(-1);
          done();
        });
    });
  });
  /**
   * TEST FOR SKILL API
   */
  describe('Skill', function(){

    var fencingId;
    var skillObj = {skill: 'fencing'};

    it('should add a skill to database', function(done){
      request.post('/api/skill/create')
        .send(skillObj)
        .end(function(err, res){
          var addedSkill = JSON.parse(res.text);
          fencingId = addedSkill.id;
          expect(addedSkill.name).to.equal(skillObj.skill);
          done();
        });
    });
    it('should not add an already existing skill', function(done){
      request.post('/api/skill/create')
        .send(skillObj)
        .end(function(err, res){
          var addedSkill = JSON.parse(res.text);
          expect(addedSkill.exists).to.equal(true);
          done();
        });
    });
    it('should retrieve all skills from the Skill table', function(done){
      request.get('/api/skill/all')
        .end(function(err, res) {
          var skills = JSON.parse(res.text);
          expect(skills[0].name).to.equal(skillObj.skill);
          done();
        });
    });
    it('should retrieve the id of a stored skill from the Skill table', function(done){
      request.get('/api/skill/name=fencing')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(fencingId);
          done();
        });
    });
    it('should standardize input', function(done){
      request.get('/api/skill/name=Fencing')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(fencingId);
          done();
        });
    })
    it('should remove specified skills from database', function(done){
      request.post('/api/skill/remove')
        .send(skillObj)
        .end(function(err, res){
          var removedSkill = JSON.parse(res.text);
          expect(removedSkill.id).to.equal(fencingId);
          done();
        });
    });
    it('should return -1 for non-existing skill', function(done){
      request.get('/api/skill/name=Fencing')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(-1);
          done();
        });
    });
  });

  /**
   * TEST FOR INDIVIDUAL API
   */
  describe('Individual', function(){

    var indId;
    var indObj = {
      email: 'gong.jim@gmail.com',
      password: 'asparagus',
      name: 'Jimmy Gong'
    };
    it('should add individual to database', function(done){
      request.post('/api/individual/create')
        .send(indObj)
        .end(function(err, res){
          var addedInd = JSON.parse(res.text);
          indId = addedInd.id;
          expect(addedInd.email).to.equal(indObj.email);
          expect(addedInd.name).to.equal(indObj.name);
          done();
        });
    });
    it('should retrieve all individuals from the database', function(done){
      request.get('/api/individual/all')
      .end(function(err, res){
        var individuals = JSON.parse(res.text);
        expect(individuals[0].email).to.equal(indObj.email);
        done();
      });
    });
    it('should retrieve the id of an individual in database by email', function(done){
      request.get('/api/individual/email=gong.jim@gmail.com')
        .end(function(err, res){
          var individual = JSON.parse(res.text);
          expect(individual.id).to.equal(indId);
          done();
        });
    });
    it('should retrieve all individuals filtered by name', function(done){
      request.get('/api/individual/name=Jimmy Gong')
        .end(function(err, res){
          var individuals = JSON.parse(res.text);
          expect(individuals[0].id).to.equal(indId);
          done();
        });
    });
    it('should remove individuals', function(done){
      request.post('/api/individual/remove')
        .send(indObj)
        .end(function(err, res){
          var removedInd = JSON.parse(res.text);
          expect(removedInd.id).to.equal(indId);
          done();
        });
    });
    it('should return -1 for non-existing individual', function(done){
      request.get('/api/individual/email=gong.jim@gmail.com')
        .end(function(err, res){
          var individual = JSON.parse(res.text);
          expect(individual.id).to.equal(-1);
          done();
        });
    });
  });
  /**
   * TEST FOR ORGANIZATION API
   */
  describe('Organization', function(){
    var orgId;
    var orgObj = {
      email: 'jg3043@nyu.edu',
      password: 'bigapple',
      name: 'Jimmytonic',
      location: 'new york city'
    };
    var secondObj = {
      email: 'jimmy.gong@hackreactor.com',
      password: 'olfactory',
      name: 'Jimmy Incorporated',
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

  })
});

