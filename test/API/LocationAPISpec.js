var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');
var bcrypt = require('bcrypt');

function spec(){

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
}

module.exports = spec;