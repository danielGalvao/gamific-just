Meteor.subscribe('emails');
Meteor.subscribe('justelecas');

emails = new Array;

Template.navBar.rendered = function () {
	$('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
};

Template.logout.rendered = function () {
	AccountsTemplates.logout();
	Router.go('/');
};

Template.listCoin.helpers({
	'justelecas': function() {
		if (Meteor.user()) {
			var user = Meteor.user().emails[0].address;
			return Justelecas.find({reciever: user}, {sort: {timestamp: -1}});
		}
	},
	'count': function() {
		if (Meteor.user()) {
			var user = Meteor.user().emails[0].address;
			return Justelecas.find({reciever: user}).count();
		}
	}
});

Template.listMe.helpers({
	'justelecas': function() {
		if (Meteor.user()) {
			var user = Meteor.user().emails[0].address;
			return Justelecas.find({sender: user}, {sort: {timestamp: -1}});
		}
	},
	'count': function() {
		if (Meteor.user()) {
			var user = Meteor.user().emails[0].address;
			return Justelecas.find({sender: user}).count();
		}
	}
});

Template.justeleca.helpers({
	'prettifyDate': function(timestamp) {
		var time = moment(new Date(timestamp)).fromNow();
		return time;
	}
});

Template.addCoin.events({
	'submit #addCoin': function(e, t) {
		e.preventDefault();
		window.evt = e;
		var sender = Meteor.user().emails[0].address;
		var reciever = e.target.reciever.value;
		var reason = $('#reason').val();
		console.log(sender, reciever, reason);
		Meteor.call('addCoin', sender, reciever, reason, function(err, data) {
			console.log(data);
			if (data == 'reciever_not_found') {
				Materialize.toast('Verifique o e-mail digitado.', 3000);
			} else if (data == 'no_reason') {
				Materialize.toast('Especifique um motivo.', 3000);
			} else if (data == 'same') {
				Materialize.toast('Não pode ser para você.', 3000)
			}

		});
	},
	'click .collection': function(e, t) {
		var input = $('#reciever');
		var items = $('.emailList .collection a');
		var item = e.target;
		var text = item.text;
		items.removeClass('active');
		$(item).addClass('active');
		input.val(text);
		$('.emailList').html('');
	},
	'keyup #reciever': function(e, t) {
		var typed = '^' + e.target.value;
		var items ='';
		var div = $('.emailList');
		div.html('');
		if (typed.length > 2) {
			var re =  new RegExp('^'+typed);
			var list = Meteor.users.find({'emails.address': { $regex: re}}).fetch();
			if (list[0]) {
				list.forEach(function(item) {
					var email = item.emails[0].address;
					items += '<a href="#" class="collection-item">'+email+'</a>';
				})
				var markup = '<div class="collection">'+ items + '</div>';
				div.html(markup);
			}
		}
	}
})