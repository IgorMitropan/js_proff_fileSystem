var express = require('express');
var router = express.Router();
var path = require('path');
var HttpError = require('../error').HttpError;

var ROOT = __dirname.split('\\').slice(0,-2).join('\\');

router.get('/', function (req, res, next) {
    res.render('index', {});
    });

/* GET dir content */
router.get('/directory', require('./directory').get);

/* GET file content */
router.get('/file:*', function(req, res, next) {
    var filePath = req.params[0];
    filePath = checkPath(filePath, next);
    require('./file').sendFileSafe(filePath, res, next);
});

router.get('/comments:*', function(req, res, next) {
    var itemPath = req.params[0];
    itemPath = checkPath(itemPath, next);
    require('./comments').sendCommentsFromDB(itemPath, res, next);

});

router.post('/comment', function(req, res, next) {
    var body = req.body;

    if (body.path && body.comment) {
        body.path = checkPath(body.path, next);
    } else {
        next(400);
    }

    require('./comments').saveCommentToDB(body, res, next);

});

function checkPath(checkingPath, next) {
    try {
        checkingPath = decodeURIComponent(checkingPath); // %D1%8F
    } catch(e) {
        return next(400);
    }

    if (~checkingPath.indexOf('\0')) {
        return next(400);
    }

    checkingPath = path.normalize(path.join(ROOT, checkingPath));

    if (checkingPath.indexOf(ROOT) !== 0) {
        return next(new HttpError(404, 'Content not found'));
    }

    return checkingPath;
}

module.exports = router;

