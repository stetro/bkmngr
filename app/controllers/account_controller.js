var locomotive = require('locomotive'),
	passport = require('passport'),
	Controller = locomotive.Controller;

var Account = require('../models/account');

var AccountController = new Controller();

AccountController.login = function() {
	this.title = 'bkmngr - Signin';
	this.message = "";
	this.render();
}
AccountController.logout = function() {
	this.req.logout();
	this.title = 'bkmngr - Signin';
	this.message = 'logout successful';
	this.render('login');
}
AccountController.show = function() {
	if (!this.req.isAuthenticated()) {
		this.req.logout();
		this.title = 'bkmngr - Signin';
		this.message = 'please signin';
		this.render('login');
		return;
	}

	this.user = this.req.user;
	this.response.send(this.user);
};

AccountController.signin = function() {
	var self = this;
	passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login'
		}
	)(this.__req, this.__res, this.__next);
}
AccountController.signup = function() {
	var account = new Account();

	account.email = this.param('email');
	account.password = this.param('password');
	account.username = this.param('username');

	var self = this;
	this.title = 'bkmngr - Signup';
	account.save(function(err) {
		if (err) {
			self.message = 'error appeared - please check your input \n' + err;
			self.render('login');
			return;
		}
		self.message = 'account ' + account.username + ' successful signed up';
		self.render('login');
	});
};

module.exports = AccountController;