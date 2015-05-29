if(Meteor.isClient){
	Template.myinfo.helpers({
		_myinfo: function(){
			var park = col_parking.find(glocal('_login')._id).fetch();
			if(park.length != 1)
				return null;

			park = park[0];
			var f_avali = 0;

			for(var x=0;x<park.info.flows.length;x+=1)
				if(park.info.flows[x].stat == true)
					f_avali += 1;
			
			park.info.flows = park.info.flows.length;
			park.info.flows_avali = f_avali;

			return [park];
		}
	});
}
