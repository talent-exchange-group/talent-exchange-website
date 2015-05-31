var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');


describe('API', function(){
  describe('Skill API', function(){

    var fencingId;

    it('should add a skill to the Skill table', function(done){
      var skillObj = {skill: 'Fencing'};
      request.post('/api/skill')
        .send(skillObj)
        .end(function(err,res){
          var addedSkill = JSON.parse(res.text);
          fencingId = addedSkill.id;
          expect(addedSkill.name).to.equal(skillObj.skill);
          done();
        });
    });
    it('should retrieve all skills from the Skill table', function(done){
      request.get('/api/skill/all')
        .end(function(err, res) {
          var skills = JSON.parse(res.text);
          expect(skills[0].name).to.equal('Fencing');
          done();
        });
    });
    it('should retrieve the id of a stored skill from the Skill table', function(done){
      request.get('/api/skill/Fencing')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(fencingId);
          done();
        });
    });
    it('should return -1 for non-existing skill', function(done){
      request.get('/api/skill/NOTFOUNDBASKETWEAVING')
        .end(function(err, res){
          var skill = JSON.parse(res.text);
          expect(skill.id).to.equal(-1);
          done();
        });
    });
  });
});

