var AuthController = require('../controllers/AuthController');
var IndController = require('../controllers/IndController');
var OrgController = require('../controllers/OrgController');
var SkillController = require('../controllers/SkillController');
var LocController = require('../controllers/LocController');
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
  app.post('/api/individual/remove', function(req, res){
    var email = req.body.email;
    return IndController.remove(email, function(removedInd){
      return res.send(removedInd);
    });
  });
  /**
   * ORGANIZATION API
   */
  app.get('/api/organization/*', function(req, res){
    var param = req.params[0].split('=');
    if(param[0] === 'all'){
      return OrgController.getAll(function(organizations){
        return res.send(organizations);
      });
    }
    if(param[0] === 'email'){
      return OrgController.getId(param[1], function(id){
        return res.send(id);
      });
    }
    if(param[0] === 'name'){
      return OrgController.getByName(param[1], function(organizations){
        return res.send(organizations);
      });
    }
    if(param[0] === 'location'){
      return OrgController.getByLocation(param[1], function(organizations){
        return res.send(organizations);
      });
    }
  });
  app.post('/api/organization/create', function(req, res){
    var email = req.body.email,
        password = req.body.password,
        name = req.body.name,
        location = req.body.location;
    return OrgController.add(email, password, name, location, function(addedOrg){
      return res.send(addedOrg);
    });
  });
  app.post('/api/organization/remove', function(req, res){
    var email = req.body.email;
    return OrgController.remove(email, function(removedOrg){
      return res.send(removedOrg);
    });
  });
  /**
   * LOCATION API
   */ 
  app.get('/api/location/*', function(req, res){
    var param = req.params[0].split('=');
    if(param[0] === 'all'){
      return LocController.getAll(function(locations){
        return res.send(locations);
      });
    }
    return LocController.getId(param[1], function(location){
      return res.send(location);
    });
  });
  app.post('/api/location/create', function(req, res){
    var location = req.body.location;
    return LocController.add(location, function(addedLoc){
      return res.send(addedLoc);
    });
  });
  app.post('/api/location/remove', function(req, res){
    var location = req.body.location;
    return LocController.remove(location, function(removedLoc){
      return res.send(removedLoc);
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