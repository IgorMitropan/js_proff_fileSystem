var fs = require('fs');
var config = require('../config');

exports.get = function(req, res, next) {
    var tree = readTree(config.get('directory'));
    res.json(tree);
};

function readTree(dirPath) {
    var normalizedTree = {};
    var tree =  fs.readdirSync(dirPath);

    for (var i = 0; i < tree.length; i++) {
        var dirPathNew = dirPath + '/' + tree[i];
        normalizedTree[tree[i]] = (fs.statSync(dirPathNew).isDirectory()) ? readTree(dirPathNew) : {};
    }

    return normalizedTree;
}