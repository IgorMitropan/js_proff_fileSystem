'use strict';
const config = require('../config');
let fileSystem = require('../lib/fileSystem');

exports.get = function(req, res, next) {
    let tree = fileSystem.readDirectoryTree(config.get('directory'));
    res.json(tree);
};
