if(Meteor.isClient){
	Template.menu.helpers({
		menu_list: function(){
			var p_menu = [
				{item:'Meus Dados',	location:'/myinfo'},
				{item:'Listar Bikes',	location:'/listbike'},
				{item:'Inserir Bike',	location:'/regbike'},
				{item:'Retirar Bike',	location:'/retbike'},
				{item:'Logout',		location:'exit'}
			];
			var u_menu = [
				{item:'Bicicleta',	location:'/mybike'},
				{item:'Meus Dados',	location:'/clientinfo'},
				{item:'Logout',		location:'exit'}
			];
			console.log(u_menu);

			if(glocal('_login').user == 'parking')
				return p_menu;
			else
				return u_menu;
		},
		_menu: function(){
			return Session.get('_menu');
		}
	});

	Template.menu.events({
		'click .menu_item': function(){
			console.log('asdasd');
			if(this.location !== 'exit')
				Router.go(this.location);
			else{
				localStorage.removeItem('_login');
				Session.set('_menu', false);
				Router.go('/');
			}
			Session.set('_menu',false);
		},
		'click .menu_log': function(){
			if(!JSON.parse(localStorage.getItem('_login')))
				Router.go('/login');
			else
				Session.set('_menu',!Session.get('_menu'));
		}
	});
}
