var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var Books = require('../models/books');

var BooksController = new Controller();

BooksController.index = function() {
	if (!this.req.isAuthenticated()) {
		this.redirect('/login');
		return;
	}
	var self = this;

	Books.find(function(err, books) {
		if (err) {
			self.res.json([]);
		} else {
			self.res.json(books);
		}
	});
};

BooksController.create = function() {
	if (!this.req.isAuthenticated()) {
		this.redirect('/login');
		return;
	}
	var self = this;
	book = new Books(this.req.body);
	book.save(function(err) {
		if (err) {
			self.res.send(500, 'could not save! invalid data');
		} else {
			self.res.json(book);
		}
	});
}

module.exports = BooksController;