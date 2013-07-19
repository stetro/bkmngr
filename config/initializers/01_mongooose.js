module.exports = function() {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://@localhost/bkmngr');

	var mongooseTypes = require("mongoose-types");
	mongooseTypes.loadTypes(mongoose);
}
