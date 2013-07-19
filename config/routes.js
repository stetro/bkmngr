
module.exports = function routes() {
	this.root('pages#main');
	
	this.get('/login', 'account#login');
	this.get('/signout', 'account#logout');
	this.post('/signin', 'account#signin');
	this.post('/signup', 'account#signup');
	this.get('/account', 'account#show');

	this.resources('books');
	this.resources('tags');
}