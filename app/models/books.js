var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;
var Url = mongoose.SchemaTypes.Url;

var bcrypt = require('bcrypt');

var BookSchema = new Schema({
	isbn: {
		type: String,
		unique: true
	},
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	url: {
		type: String
	},
	thumbnail: {
		type: Url
	},
	tags: {
		type: Array
	},
	favorite: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Books', BookSchema);