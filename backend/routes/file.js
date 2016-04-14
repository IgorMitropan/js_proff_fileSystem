var path = require('path');
var fs = require('fs');
var HttpError = require('../error').HttpError;

var ROOT = __dirname.split('\\').slice(0,-2).join('\\');

exports.sendFileSafe = function (filePath, res, next) {

    try {
        filePath = decodeURIComponent(filePath); // %D1%8F
    } catch(e) {
        return next(400);
    }

    if (~filePath.indexOf('\0')) {
        return next(400);
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) !== 0) {
        return next(new HttpError(404, 'File not found'));
    }

    fs.stat(filePath, function(err, stats) {
        if (err || !stats.isFile()) {
            return next(new HttpError(404, 'File not found'));
        }

        sendFile(filePath, res, next);
    });
};

function sendFile(filePath, res, next) {
    var file = new fs.ReadStream(filePath);

    var mime = require('mime').lookup(filePath);
    res.setHeader('Content-Type', mime + "; charset=utf-8");

    file.pipe(res);

    file.on('error', function(err) {
        next(500);
    });


    res.on('close', function() {
            file.destroy();
    });
}
