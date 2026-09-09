const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
    cost: {
        type: Number,
        min: 0,
        required: true
    },
    user_email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
		required: true
	},
    placed_time: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 0,
        required: true
    },
    status: {
        type: String,
        enum: ['placed', 'accepted', 'cooking', 'ready', 'completed', 'rejected'],
        default: 'placed',
        required: true
    },
    rating: {
        type: Number,
        default: -1,
        min: -1,
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
    }


});

module.exports = Order = mongoose.model("Orders", OrderSchema);