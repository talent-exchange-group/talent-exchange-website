var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');


describe('Skill API', function(){
  describe('add skill', function(){
    it('adds a skill to the Skill table', function(done){
      var skillObj = {skill: 'Fencing'};
      request.post('/api/skill')
        .send(skillObj)
        .end(function(err,res){
          // console.log(JSON.parse(res.text.name));
          var parsedRes = JSON.parse(res.text);
          expect(parsedRes.name).to.equal(skillObj.skill);
          done();
        });
    });
  });
});

