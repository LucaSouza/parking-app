if(Meteor.isClient){
	Session.setDefault('to_login', false);
	Session.setDefault('form_floap', 'Logar >');
	Session.setDefault('log_err', '');

	/*Template.logfind.helpers({
		to_login: function(){
			return Session.get('to_login');
		},
		form_floap: function(){
			return Session.get('form_floap');
		}
	});
	Template.logfind.events({
		'click .ffloap': function(){
			Session.set('to_login', !Session.get('to_login'));
			if(Session.get('to_login'))
				Session.set('form_floap', 'Buscar >');
			else
				Session.set('form_floap', 'Logar >');
		}
	});*/

	Template.login.helpers({
		log_err: function(){
			return Session.get('log_err');
		}
	});
	Template.login.events({
		'submit .login': function(evt){
			var logn = evt.target.cnpj_cpf.value;
			var pass = evt.target.pass.value;
			var data = null;
			var utype = null;
			

			data = col_client.find({cpf:parseInt(logn),passwd:pass});

			if(data.count() == 0){
				logn = logn.split('-');
				if(logn.length != 2){
					Session.set('log_err', 'Erro ao logar');
					return false;
				}

				data = col_parking.find({cnpj:parseInt(logn[0]),passwd:pass,variant:logn[1]});
				if(data.count == 0){
					Session.set('log_err', 'Erro ao logar');
					return false;
				}else
					utype = "parking";
			}else
				utype = "client";

			if(data.count() != 1)
				return false;

			data = data.fetch();
			data = data[0]._id;

			localStorage.setItem('_login',
					JSON.stringify({
						_id:data,
						user:utype
					}));

			return true;
		}
	});
}
