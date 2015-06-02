/**
 * Import Express
 */
var express = require('express');

/**
 * Create Express server
 */
var app = express();

/**
 * Configure server
 */
require('./server/index')(app);

app.use(express.static(__dirname + '/dist'));
app.set('port', process.env.PORT || 1337);
app.listen(app.get('port'), function(){
  console.log("Listening on port %d", app.get('port'));
});