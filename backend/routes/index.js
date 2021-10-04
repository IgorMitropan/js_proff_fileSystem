'use strict';
const express = require('express');
const router = express.Router();

let checkAuth = require('../middleware/checkAuth');
let fileSystem = require('../lib/fileSystem');

router.get('/', function (req, res, next) {
    res.render('index', {});
    });

/* GET dir content */
router.get('/directory', require('./directory').get);

/* GET file content */
router.get('/file:*', checkAuth, function(req, res, next) {
    let filePath = req.params[0];
    filePath = fileSystem.checkPath(filePath, next);

    require('./file').sendFileSafe(filePath, res, next);
});

/* GET comments */
router.get('/comments:*', function(req, res, next) {
    let itemPath = req.params[0];
    itemPath = fileSystem.checkPath(itemPath, next);

    require('./comments').sendCommentsFromDB(itemPath, res, next);
});

/* send comment */
router.post('/comment', checkAuth, function(req, res, next) {
    let obj = req.body;

    if (obj.item && obj.comment) {
        obj.item = fileSystem.checkPath(obj.item, next);
        obj.username = req.user.get('username');
        obj.created = Date.now();
    } else {
        next(400);
    }

    require('./comments').saveCommentToDB(obj, res, next);

});

/* authorization */
router.post('/login', require('./login').post);

router.post('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;

