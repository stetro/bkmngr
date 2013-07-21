var bkmngr = angular.module('bkmngr', ['ngResource', '$strap.directives']);

bkmngr.controller('ListController', function($scope, $resource, $http) {
	$('*[data-toggle=tooltip]').tooltip();

	var Book = $resource('/books/:id', {
		id: '@_id'
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
		if (!('title' in $scope.newBook) || !('author' in $scope.newBook) || !('thumbnail' in $scope.newBook)) {
			return;
		}
		$scope.newBookProcess = true;
		$scope.newBook.$save({}, function(book) {
			$scope.newBook = new Book();
			$scope.newBookError = '';
			$scope.books.push(book);
			if ($scope.newBook.url != undefined && $scope.newBook.url.length > 0) {
				$('.popover').popover('hide');
				$scope.newBookProcess = false;
			} else {
				var files = document.getElementById('bookuploader').files;
				if (files == undefined || files.length == 0) {
					$scope.newBookError = 'no file found!';
					return;
				}
				var formData = new FormData();
				var filename = files[0].name;
				var extension = filename.substr(filename.indexOf('.'), filename.length);
				var newFileName = book._id + extension;
				formData.append('file', files[0], book._id + extension);
				$http({
					method: 'POST',
					url: '/books/' + book._id,
					headers: {
						'Content-Type': undefined
					},
					data: formData,
					transformRequest: angular.identity
				}).success(function() {
					book.url = "/books/" + newFileName;
					book.$update();

					$('.popover').popover('hide');
					$scope.newBookProcess = false;
				}).error(function() {
					$scope.newBookProcess = false;
					$scope.newBookError = 'book was saved but not uploaded';
				});
			}
		}, function(err) {
			$scope.newBookError = err.data;
			$scope.newBookProcess = false;
		});
	};

	$scope.addNewTag = function(tag) {
		if ($scope.newTag.title.length == 0 || $scope.tags.indexOf($scope.newTag.title) >= 0) {
			return;
		}
		$scope.newTag.$save({}, function(tag) {
			$scope.tags.push($scope.newTag);
			$scope.newTag = new Tag();
			$('.popover').popover('hide');
		}, function(err) {
			$scope.newTagError = err.data;
		});
	};

	$scope.fetchDataFromISBN = function() {
		if ($scope.newBook.isbn == undefined || $scope.newBook.isbn.length < 6) {
			$scope.newBookError = 'invalid ISBN';
			return;
		} else {
			$scope.newBook.isbn = $scope.newBook.isbn.replace(/-/g, '');
			$http.jsonp('https://www.googleapis.com/books/v1/volumes?q=' + $scope.newBook.isbn + '&callback=JSON_CALLBACK').success(function(books) {
				if (books.items == undefined) {
					$scope.newBookError = 'book not found';
					return;
				} else {
					$scope.newBookError = '';
					book = books.items[0].volumeInfo;
					$scope.newBook.author = book.authors.join(', ');
					$scope.newBook.title = book.title;
					if ('imageLinks' in book) {
						$scope.newBook.thumbnail = book.imageLinks.thumbnail.replace('zoom=1', 'zoom=2');
					}
					angular.forEach(book.industryIdentifiers, function(value, key) {
						$scope.newBook.isbn = value.identifier;
					});
				}
			});
		}
	};
	$scope.formatUploader = function() {
		$('input[type=file].format').bootstrapFileInput();
		$('.format').removeClass('format');
	};
});