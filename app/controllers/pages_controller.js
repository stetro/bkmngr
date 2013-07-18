var locomotive = require('locomotive'),
	passport = require('passport'),
	Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
	if (!this.req.isAuthenticated()) {
		this.redirect('/login');
	}
	this.title = 'bkmngr - Book Management';
	this.render();
}

module.exports = PagesController;