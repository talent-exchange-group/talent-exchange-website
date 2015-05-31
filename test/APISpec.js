var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');


describe('API', function(){
  describe('Skill API', function(){

    var fencingId;
    var skillObj = {skill: 'fencing'};

    it('should add a skill to the Skill table', function(done){
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
          expect(addedSkill.id).to.equal(fencingId);
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
      request.get('/api/skill/fencing')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(fencingId);
          done();
        });
    });
    it('should standardize input', function(done){
      request.get('/api/skill/Fencing')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(fencingId);
          done();
        });
    })
    it('should remove entries', function(done){
      request.post('/api/skill/remove')
        .send(skillObj)
        .end(function(err, res){
          var removedSkill = JSON.parse(res.text);
          expect(removedSkill.id).to.equal(fencingId);
          done();
        });
    });
    it('should return -1 for non-existing skill', function(done){
      request.get('/api/skill/Fencing')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(-1);
          done();
        });
    });
  });
});

