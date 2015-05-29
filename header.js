if(Meteor.isClient){
	Template.header.helpers({
		is_client: function(){
			if(glocal('_login') == null)
				return true;
			if(glocal('_login').user == 'parking')
				return false;
			
			return true;
		},
		_cli_login: function(){
			if(glocal('_login') != null)
				return true;
			return false;
		}
	});
}
