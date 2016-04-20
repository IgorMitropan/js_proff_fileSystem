var dataBase = require('../lib/database');
var HttpError = require('../error').HttpError;

exports.sendCommentsFromDB = function (itemPath, res, next) {
    dataBase.then(
        function(db) {
            findDocuments(db, itemPath, function(docs) {
                res.json(docs);
            });
        },
        function(err) {
            next(new HttpError(500, "Connection to database failed"));
        });
};

exports.saveCommentToDB = function(obj, res, next) {
    if ( isCommentValid(obj.comment, next) ) {
        dataBase.then(
            function(db) {
                insertDocument(db, obj, function(result) {
                    res.json(result.ops[0].comment);
                });
            },
            function(err) {
                next(new HttpError(500, "Connection to database failed"));
            });
    } else {
        next(400);
    }
};

function findDocuments(db, itemPath, callback) {
    var collection = db.collection('comments');

    collection.find({item: itemPath}).toArray(function(err, docs) {
        if (err) {
            next(new HttpError(500, "Connection to database collection failed"));
        }
        callback(docs);
    });
}

function insertDocument(db, obj, callback) {
    var collection = db.collection('comments');

    collection.insertOne({item : obj.path, comment: obj.comment},
        function(err, result) {
            if (err) {
                next(new HttpError(500, "Inserting item to database failed"));
        }
            callback(result);
        });
}

function isCommentValid(comment) {
    try {
        var result = comment.trim()
    } catch (e) {
        return next(400);
    }

    return result;
}