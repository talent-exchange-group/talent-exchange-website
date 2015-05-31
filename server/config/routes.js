var AuthController = require('../controllers/AuthController');
var IndController = require('../controllers/IndController');
var OrgController = require('../controllers/OrgController');
var utils = require('../helpers/utils');

function router(app, passport){
  app.get('/', function(req, res){
    res.sendStatus(200);
  });
  /**
   * Retrieve all skills
   */
  app.get('/api/skill', function(req, res){
    utils.getAllSkills(function(skills){
      return res.send(skills);
    })
  });
  app.post('/api/skill', function(req, res){
    var skill = req.body.skill;
    console.log('hello');
    utils.addSkill(skill, function(addedSkill){
      return res.send(addedSkill);
    });

  });
}

module.exports = router;