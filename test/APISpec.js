var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');


describe('API', function(){
  describe('Skill API', function(){
    it('should add a skill to the Skill table', function(done){
      var skillObj = {skill: 'Fencing'};
      request.post('/api/skill')
        .send(skillObj)
        .end(function(err,res){
          var addedSkill = JSON.parse(res.text);
          expect(addedSkill.name).to.equal(skillObj.skill);
          done();
        });
    });
    it('should retrieve all skills from the Skill table', function(done){
      request.get('/api/skill')
        .end(function(err, res) {
          var skills = JSON.parse(res.text);
          expect(skills[0].name).to.equal('Fencing');
          done();
        });
    });
  });
});

