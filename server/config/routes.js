var AuthController = require('../controllers/AuthController');
var IndController = require('../controllers/IndController');
var OrgController = require('../controllers/OrgController');
var SkillController = require('../controllers/SkillController');

function router(app, passport){
  app.get('/', function(req, res){
    return res.sendStatus(200);
  });
  /**
   * INDIVIDUAL API
   */
  app.get('/api/individual/*', function(req, res){
    var param = req.params[0].split('=');
    if(param[0] === 'all'){
      return IndController.getAll(function(individuals){
        return res.send(individuals);
      });
    }
    if(param[0] === 'email'){
      return IndController.getId(param[1], function(id){
        return res.send(id);
      });
    }
    if(param[0] === 'name'){
      return IndController.getByName(param[1], function(individuals){
        return res.send(individuals);
      });
    }
  });
  app.post('/api/individual/create', function(req, res){
    var email = req.body.email,
        password = req.body.password,
        name = req.body.name;
    return IndController.add(email, password, name, function(addedInd){
      return res.send(addedInd);
    });
  });
  /**
   * SKILL API
   */
  app.get('/api/skill/*', function(req, res){
    var param = req.params[0].split('=');
    if(param[0] === 'all'){
      return SkillController.getAll(function(skills){
        return res.send(skills);
      });
    }
    return SkillController.getId(param[1], function(id){
      return res.send(id);
    });
  });

  app.post('/api/skill/create', function(req, res){
    var skill = req.body.skill;
    return SkillController.add(skill, function(addedSkill){
      return res.send(addedSkill);
    });
  });
  app.post('/api/skill/remove', function(req, res){
    var skill = req.body.skill;
    return SkillController.remove(skill, function(removedSkill){
      return res.send(removedSkill);
    });
  });

  
}

module.exports = router;