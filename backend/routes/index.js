var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {});
    });

/* GET dir content */
router.get('/directory', require('./directory').get);

/* GET file content */
router.get('/file:*', function(req, res, next) {
    var filePath = req.params[0];
    require('./file').sendFileSafe(filePath, res, next);
});

module.exports = router;

