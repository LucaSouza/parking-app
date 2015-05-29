if(Meteor.isClient){
	Session.setDefault('_menu',false);
	var store = JSON.parse(localStorage.getItem('_login'));

	if(store)
		if(store.user == 'parking' ){
			if(location.pathname == '/')
				Router.go('/myinfo');
		}

	Template.home.helpers({
		park_list: function(){
			var methods = methods_get();

			try{
				if(!methods || methods.city_search == ""){
					var block = col_parking.find();
					return block;//col_parking.find({});
				}
				else{
					return col_parking.find({"info.city":String(methods.city_search)});
				}
			}
			catch(err){
				//console.log(err);
			}
			return null;
		}
	});
	Template.home.events({
	});
}
