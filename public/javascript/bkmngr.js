var bkmngr = angular.module('bkmngr', ['ngResource', '$strap.directives']);

bkmngr.controller('ListController', function($scope, $resource, $http) {
	$("*[data-toggle=tooltip]").tooltip();
	var Book = $resource('/books/:id', {
		id: "@_id"
	}, {
		update: {
			method: 'PUT'
		}
	});
	var Tag = $resource('/tags/');
	$scope.books = Book.query();
	$scope.tags = Tag.query();
	$scope.newBook = new Book();
	$scope.newTag = new Tag();
	$scope.newBookProcess = false;

	$scope.typeaheadForBooks = function(query) {
		return $.map($scope.books, function(book) {
			return book.title;
		});
	};

	$scope.toggleFavorite = function(book) {
		book.favorite = !book.favorite;
		book.$update();
	};

	$scope.saveNewBook = function() {
		if (!('title' in $scope.newBook) || !('author' in $scope.newBook) || !('url' in $scope.newBook) || !('thumbnail' in $scope.newBook)) {
			return;
		}
		$scope.newBookProcess = true;
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
					if ("imageLinks" in book) {
						$scope.newBook.thumbnail = book.imageLinks.thumbnail.replace('zoom=1', 'zoom=2');
					}
				}
			});
		}
	}
});