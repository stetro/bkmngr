var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var Tags = require('../models/tags');
var TagsController = new Controller();

TagsController.index = function() {
	if (!this.req.isAuthenticated()) {
		this.redirect('/login');
		return;
	}
	var self = this;
	Tags.find(function(err, tags) {
		if (err) {
			self.res.json([]);
		} else {
			self.res.json(tags);
		}
	});
};

TagsController.create = function() {
	if (!this.req.isAuthenticated()) {
		this.redirect('/login');
		return;
	}
	var self = this;
	tag = new Tags(this.req.body);
	tag.save(function(err) {
		if (err) {
			self.res.send(500, 'could not save! invalid data');
		} else {
			self.res.json(tag);
		}
	});
};

module.exports = TagsController;