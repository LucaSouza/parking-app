if(Meteor.isClient){
	Session.setDefault('list_bike',null);

	Template.listbike.helpers({
		list_bike: function(){
			if(Session.get('list_bike') != null)
				return Session.get('list_bike');
			var park = col_parking.find(glocal('_login')._id);
			if(park.count() != 1)
				return null;
			
			park = park.fetch()[0].info.client;
			var list = [];
			for(var x=0;x<park.length;x+=1){
				if(park[x].stat){
					var cli = col_client.find({cpf:park[x].cpf}).fetch()[0];
					list.push({
						name: cli.name,
						phone: cli.phone,
						yold: cli.yold,
						flow: park[x].flow,
						stat: (park[x].stat) ? 'point_using':'point_no_using'
					});
				}
			}
			if(list.length == 0)
				return null;
			return list;
		}
	});

	Template.listbike.events({
		'click .select': function(){
			var cap = Session.get('select_caption');
			if(cap == "Todos"){
				Session.set('select_caption','Online');
			}else{
				Session.set('select_caption','Todos');
			}
		}
	});
}
