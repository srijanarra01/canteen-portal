const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
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
	age: {
		type: Number,
		min: 10,
		required: true
	},
	batch: {
		type: String,
		enum: ['UG1', 'UG2', 'UG3', 'UG4', 'UG5'],
		required: true
	},
	wallet_balance: {
		type: Number,
		min: 0,
		default: 0,
		required: false
	}	

});

module.exports = User = mongoose.model("Users", UserSchema);
