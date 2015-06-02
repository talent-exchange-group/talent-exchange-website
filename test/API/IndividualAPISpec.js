var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');
var bcrypt = require('bcrypt');

function spec(){
  
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
}

module.exports = spec;