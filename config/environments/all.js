var express = require('express'),
	poweredBy = require('connect-powered-by'),
	util = require('util');

var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function() {

	this.set('views', __dirname + '/../../app/views');
	this.set('view engine', 'ejs');

	this.engine('ejs', require('ejs').__express);


	this.use(poweredBy('Locomotive'));
	// this.use(express.logger());
	this.use(express.favicon());
	this.use(express.static(__dirname + '/../../public'));
	this.use(express.cookieParser());
	this.use(express.bodyParser());
	this.use(express.methodOverride());
	this.use(express.session({
		secret: 'cog2porn4os4shom9cor5it2jeg6'
	}));
	this.use(passport.initialize());
	this.use(passport.session());
	this.use(this.router);
}