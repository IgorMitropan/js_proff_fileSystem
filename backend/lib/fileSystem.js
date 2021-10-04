'use strict';
const fs = require('fs');
const path = require('path');
const config = require('../config');
const ROOT = config.get('directory');

let HttpError = require('../error').HttpError;

function readDirectoryTree(dirPath) {
    let normalizedTree = {};
    let tree =  fs.readdirSync(dirPath);

    for (var i = 0; i < tree.length; i++) {
        if (tree[i] === 'node_modules' ||  tree[i] === '.git') {
            continue;
        }

        var dirPathNew = dirPath + '/' + tree[i];

        normalizedTree[tree[i]] = (fs.statSync(dirPathNew).isDirectory()) ? readDirectoryTree(dirPathNew) : {};
    }

    return normalizedTree;
}

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

exports.readDirectoryTree = readDirectoryTree;
exports.checkPath = checkPath;