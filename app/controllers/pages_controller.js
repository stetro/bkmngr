var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
	this.title = 'bkmngr - Book Management'
	this.render();
}
PagesController.signin = function() {
	this.title = 'Sign In into bkmngr - Book Management'
	this.render();
}
module.exports = PagesController;
