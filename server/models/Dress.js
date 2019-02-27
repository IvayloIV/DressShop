const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dressSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required.']
    },
    cost: {
        type: Schema.Types.Number,
        required: [true, 'Cost is required.']
    },
    name: {
        type: Schema.Types.String,
        required: [true, 'Name is required.']
    },
    imageUrl: {
        type: Schema.Types.String,
        required: [true, 'Image is required.']
    },
    size: {
        type: Schema.Types.String,
        required: [true, 'Size is required.']
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    description: {
        type: Schema.Types.String,
        required: [true, 'Description is required.']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    creationDate: {
        type: Schema.Types.Date,
        default: Date.now
    },
    isBought: {
        type: Schema.Types.Boolean,
        default: false
    },
    userCart: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Dress = mongoose.model('Dress', dressSchema);
module.exports = Dress;
