var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
/* Commented out so that express will not serve the index, react will.
   The express API will still be available on /users.

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/


/* GET React App */
// Use the first version here to instead serve the react app on /app.

//router.get(['/app', '/app/*'], function(req, res, next) {
router.get(['/'], function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'app.html'));
});

module.exports = router;
