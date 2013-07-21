var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var Books = require('../models/books');
var http = require('http');
var fs = require('fs');

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
			self.res.send(500, err);
		} else {
			var file = fs.createWriteStream(__dirname + '/../../public/images/thumbnails/' + book._id + '.jpg');
			var request = http.get(book.thumbnail, function(response) {
				response.pipe(file);
				self.res.json(book);
			});
		}
	});
};

BooksController.update = function() {
	if (!this.req.isAuthenticated()) {
		this.redirect('/login');
		return;
	}
	var self = this;
	book = this.req.body;
	id = book._id;
	delete book._id;
	Books.findOneAndUpdate({
		_id: id
	}, book, {}, function(err, book) {
		if (err) {
			self.res.send(500, err);
		} else {
			self.res.json(book);
		}
	});
};

BooksController.upload = function() {
	console.log(this.req.files);
	var file = this.req.files.file;
	var self = this;
	fs.readFile(file.path, function(err, data) {
		var newPath = __dirname + '/../../public/books/' + file.name;
		fs.writeFile(newPath, data, function(err) {
			if (err) {
				console.log(err);
				self.res.send(500);
			} else {
				self.res.send(200);
			};

		});
	});
};

module.exports = BooksController;