const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: {
        type: Schema.Types.String,
        required: [true, 'Message is required.']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dress: {
        type: Schema.Types.ObjectId,
        ref: 'Dress',
        required: true
    },
    rating: {
        type: Schema.Types.Number,
        required: true,
        min: 1,
        max: 5
    },
    creationDate: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
