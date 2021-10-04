var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    item: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    }
});

schema.statics.isTextValid = function(comment) {
   return comment.trim();
};

exports.Comment = mongoose.model('Comment', schema);