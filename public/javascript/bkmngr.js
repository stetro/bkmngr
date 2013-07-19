var bkmngr = angular.module('bkmngr', ['ngResource', '$strap.directives']);

bkmngr.controller('ListController', function($scope, $resource, $http) {
	var Book = $resource('/books/:id');
	$scope.books = Book.query();
	$scope.newBook = new Book();
	$scope.newTag = "";
	$scope.tags = ["Programming", "UX"];


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
		if (tag.length == 0 || $scope.tags.indexOf(tag) >= 0) return;
		$scope.tags.push($scope.tags.indexOf(tag));
		$scope.newTag = "";
		$(".popover").popover('hide');
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