var bkmngr = angular.module('bkmngr', ['ngResource', '$strap.directives']);

bkmngr.controller('ListController', function($scope, $resource, $http) {
	$("*[data-toggle=tooltip]").tooltip();
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

	$scope.fetchDataFromISBN = function() {
		if ($scope.newBook.isbn == undefined || $scope.newBook.isbn.length < 6) {
			$scope.newBookError = "invalid ISBN";
			return;
		} else {
			$scope.newBook.isbn = $scope.newBook.isbn.replace(/-/g, "");
			$http.jsonp('https://www.googleapis.com/books/v1/volumes?q=' + $scope.newBook.isbn + '&callback=JSON_CALLBACK').success(function(books) {
				if (books.items == undefined) {
					$scope.newBookError = "book not found";
					return;
				} else {
					$scope.newBookError = "";
					book = books.items[0].volumeInfo;
					console.log(book);
					$scope.newBook.author = book.authors.join(', ');
					$scope.newBook.title = book.title;
					if("imageLinks" in book){
						$scope.newBook.thumbnail = book.imageLinks.thumbnail;
					}
				}
			});
		}
	}

	// $scope.typeaheadForBookAPI = function(query, callback) {

	// }

});