AccountsTemplates.configureRoute('ensureSignedIn', {
    template: 'login'
});

Router.plugin('ensureSignedIn');

Router.route('/', function() {
	this.render('home');
});

Router.route('/add', function() {
	this.render('addCoin');

});

Router.route('/list', function() {
	this.render('listCoin');

});

Router.route('/list/me', function() {
	this.render('listMe');

});

Router.route('/logout', function() {
	this.render('logout');

});