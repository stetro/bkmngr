var bkmngr = angular.module('bkmngr', ['ngResource']);

bkmngr.controller('ListController', function($scope, $resource) {
	Books = $resource('/books/:id');
	$scope.books = Books.query();
});