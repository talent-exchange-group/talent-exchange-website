var AuthController = require('../controllers/AuthController');
var IndController = require('../controllers/IndController');
var OrgController = require('../controllers/OrgController');
var SkillController = require('../controllers/SkillController');

function router(app, passport){
  app.get('/', function(req, res){
    res.sendStatus(200);
  });
  /**
   * Retrieve all skills
   */
  app.get('/api/skill/all', function(req, res){
    SkillController.getAllSkills(function(skills){
      return res.send(skills);
    });
  });
  app.get('/api/skill/*', function(req, res){
    var skill = req.params[0];
    SkillController.getSkillId(skill, function(id){
      return res.send(id);
    });
  });
  /**
   * Create new skill
   */
  app.post('/api/skill', function(req, res){
    var skill = req.body.skill;
    SkillController.addSkill(skill, function(addedSkill){
      return res.send(addedSkill);
    });

  });
}

module.exports = router;