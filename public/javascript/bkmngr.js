var bkmngr = angular.module('bkmngr', ['ngResource', '$strap.directives']);

bkmngr.controller('ListController', function($scope, $resource, $http) {
	var Book = $resource('/books/:id');
	var Tag = $resource('/tags/');
	$scope.books = Book.query();
	$scope.tags = Tag.query();
	$scope.newBook = new Book();
	$scope.newTag = new Tag();



	$scope.typeaheadForBooks = function(query) {
		return $.map($scope.books, function(book) {
			return book.title;
		});
	};

	$scope.saveNewBook = function() {
		if ($scope.newBook.title == undefined ||
			$scope.newBook.author == undefined ||
			$scope.newBook.url == undefined ||
			$scope.newBook.thumbnail == undefined) {
			return;
		}
		$scope.newBook.$save({}, function(book) {
			$(".popover").popover('hide');
			$scope.newBook = new Book();
			$scope.newBookError = "";
			$scope.books.push(book);
		}, function(err) {
			$scope.newBookError = err.data;
		});
	};

	$scope.addNewTag = function(tag) {
		if ($scope.newTag.title.length == 0 || $scope.tags.indexOf($scope.newTag.title) >= 0) {
			return;
		}
		$scope.newTag.$save({}, function(tag) {
			$scope.tags.push($scope.newTag);
			$scope.newTag = new Tag();
			$(".popover").popover('hide');
		}, function(err) {
			$scope.newTagError = err.data;
		});
	};

	// $scope.typeaheadForBookAPI = function(query, callback) {
	// 	$http.jsonp('https://www.googleapis.com/books/v1/volumes?q=' + query+'&callback=JSON_CALLBACK').success(function(books) {
	// 		bookList = [];
	// 		count = books.length;
	// 		$.each(books.items ,function(key,val) {
	// 			bookList.push(this.volumeInfo.title);
	// 			if(!--count){
	// 				callback(bookList);
	// 			}
	// 		});
	// 	});
	// }

});