const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: [true, 'Name is required.']
    },
    clothes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dress'
    }]
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
