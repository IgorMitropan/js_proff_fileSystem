'use strict';
let Comment = require('../models/comment').Comment;
let HttpError = require('../error').HttpError;

exports.sendCommentsFromDB = function (itemPath, res, next) {
    Comment.find({item : itemPath}, function(err, results) {
        if (err) {
            next(new HttpError(500, "Connection to database failed"));
        }

        res.json(results);
    });
};

exports.saveCommentToDB = function(obj, res, next) {
    try {
        if ( Comment.isTextValid(obj.comment) ) {
            let newComment = new Comment(obj);

            newComment.save(function(err, comment) {
                if (err) {
                    next(new HttpError(500, "Connection to database failed"));
                }

                res.json(comment)
            });
        } else {
            next(400);
        }
    } catch(e) {
        next(400);
    }
};


