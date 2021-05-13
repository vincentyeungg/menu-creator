const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// blueprint for menu model
const menuSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    menuItem: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'MenuItem'
    }]
});

module.exports = mongoose.model('Menu', menuSchema);