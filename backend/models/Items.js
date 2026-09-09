const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    shop_name: {
        type: String,
        // unique: true,
        // dropDups: true,
        required: true
    },
    item_name: {
        type: String,
        // unique: true,
        // dropDups: true,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: false
    },
    veg: {
        type: String,
        enum: ['veg', 'nonveg'],
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    addons: {
        type: [[String,Number]],
        required: false
    },
    favourites: {
		type: [String],
		required: false
	},
    num_of_ratings: {
        type: Number,
        default: 0,
        required: false
    }


});

module.exports = Item = mongoose.model("Items", ItemSchema);