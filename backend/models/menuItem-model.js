const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    menu: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Menu'
    }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);