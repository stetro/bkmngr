var locomotive = require('locomotive'),
	passport = require('passport'),
	Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
	if (!this.req.isAuthenticated()) {
		this.redirect('/login');
		return;
	}
	this.user = this.req.user;
	this.title = 'bkmngr - Overview';
	this.render();
};


module.exports = PagesController;