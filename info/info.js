if(Meteor.isClient){
	Template.bikeinfo.helpers({
		data: function(){
			var meth = methods_get();
			var cpf = 0;
			if(!meth)
				location.reload();

			try{
				cpf = parseInt(meth.cpf_user);
			}catch(err){}

			var cli = col_client.find({cpf:cpf});
			var bike = col_parking.find({'info.client.cpf':cpf,'info.client.stat':true});

			return null;
		}
	});

	Template.parkinfo.helpers({
		xdata: function(){
			var meth = methods_get();
			var index = meth.info;

			console.log(this);
			return [col_parking.find({_id:index})];
		}
	});

}
