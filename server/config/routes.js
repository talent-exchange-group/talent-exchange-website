var AuthController = require('../controllers/AuthController');
var IndController = require('../controllers/IndController');
var OrgController = require('../controllers/OrgController');
var SkillController = require('../controllers/SkillController');

function router(app, passport){
  app.get('/', function(req, res){
    res.sendStatus(200);
  });
  /**
   * INDIVIDUAL API
   */
  app.get('/api/individual/*', function(req, res){
    var param = req.params[0];
    if(param === 'all'){
      IndController.getAll(function(individuals){
        return res.send(individuals);
      });
    }
  });
  app.post('/api/individual/create', function(req, res){
    var email = req.body.email,
        password = req.body.password,
        name = req.body.name;
    IndController.add(email, password, name, function(addedInd){
      return res.send(addedInd);
    });
  });
  /**
   * SKILL API
   */
  app.get('/api/skill/*', function(req, res){
    var param = req.params[0];
    if(param === 'all'){
      SkillController.getAll(function(skills){
        return res.send(skills);
      });
    }
    else {
      var skill = param.split('=')[1];
      SkillController.getId(skill, function(id){
        return res.send(id);
      });
    }
  });

  app.post('/api/skill/create', function(req, res){
    var skill = req.body.skill;
    SkillController.add(skill, function(addedSkill){
      return res.send(addedSkill);
    });
  });
  app.post('/api/skill/remove', function(req, res){
    var skill = req.body.skill;
    SkillController.remove(skill, function(removedSkill){
      return res.send(removedSkill);
    });
  });

  
}

module.exports = router;