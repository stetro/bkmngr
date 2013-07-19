module.exports = function() {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://stetro_mongoadmin:rhuvluem@localhost:20922/bkmngr');

	var mongooseTypes = require("mongoose-types");
	mongooseTypes.loadTypes(mongoose);
}
