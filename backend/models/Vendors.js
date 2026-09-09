const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	manager_fname: {
		type: String,
		required: true
	},
	manager_lname: {
		type: String,
		required: true
	},
	shop_name: {
		type: String,
		unique: true,
		dropDups: true,
		required: true
	},
	email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
		unique: true,
		dropDups: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	contact_number: {
		type: Number,
		min: 1000000000,
		max: 9999999999,
		required: true
	},
	opening_time: {
		type: Number,
		min: 0,
		max: 2359,
		required: true
	},
	closing_time: {
		type: Number,
		min: 0,
		max: 2359,
		required: true
	}


});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
