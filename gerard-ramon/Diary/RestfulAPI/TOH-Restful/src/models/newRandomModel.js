const mongoose = require('mongoose');

const { Schema } = mongoose;

const newModel = new Schema({
	id: { type: String },
	index: { type: Number },
	guid: { type: String },
	isActive: { type: Boolean },
	balance: { type: Number },
	picture: { type: String },
	age: { type: Number },
	eyeColor: { type: String },
	name: {
		first: { type: String },
		last: { type: String }
	},
	company: { type: String },
	email: { type: String },
	phone: { type: String },
	address: { type: String },
	about: { type: String },
	registered: { type: Date, default: Date.now },
	latitude: { type: String },
	longitude: { type: String },
	tags: [String],
	range: [Number],
	friends: [
		{
			id: { type: Number },
			name: { type: String }
		}
	],
	greeting: { type: String },
	favoriteFruit: { type: String }
});
