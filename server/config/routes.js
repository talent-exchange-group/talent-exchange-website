var AuthController = require('../controllers/AuthController');
var IndController = require('../controllers/IndController');
var OrgController = require('../controllers/OrgController');
var utils = require('../helpers/utils');

function router(app, passport){
  app.get('/', function(req, res){
    res.sendStatus(200);
  });
  app.get('/api/skill', function(req, res){
    res.send(200);
  });
  app.post('/api/skill', function(req, res){
    var skill = req.body.skill;
    utils.addSkill(skill, function(addedSkill){
      return res.send(addedSkill);
    });

  });
}

module.exports = router;