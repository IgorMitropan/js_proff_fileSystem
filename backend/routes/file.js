var fs = require('fs');
var HttpError = require('../error').HttpError;

exports.sendFileSafe = function (filePath, res, next) {
    fs.stat(filePath, function(err, stats) {
        if (err || !stats.isFile()) {
            return next(new HttpError(404, 'File not found'));
        }

        if (filePath.indexOf('config.json')> -1) {
            return next(new HttpError(403, 'Access to this file content is forbidden'));
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
