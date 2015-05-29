Router.map(function(){
	this.route('home',{
		path:'/'
	});

	this.route('login',{
		path:'/login'
	});

	this.route('parkinfo',{
		path:'/parkinfo/:_id',
		data: function(){
			var park = col_parking.find(this.params._id);

			if(park.count() == 1)
				return park.fetch()[0];
		}
	});

	this.route('bikeinfo',{
		path:'/bikeinfo'
	});

	this.route('regbike',{
		path:'/regbike'
	});

	this.route('retbike',{
		path:'/retbike'
	});

	this.route('listbike',{
		path:'/listbike'
	});

	this.route('myinfo',{
		path:'/myinfo'
	});

	this.route('mybike',{
		path:'/mybike',
		data: function(){
			var cli = col_client.find(glocal('_login')._id);
			if(cli.count() != 1)
				return {'error':'Erro de autenticação.'};
			cli = cli.fetch()[0];
			var park = col_parking.find({'info.client.cpf':cli.cpf,'info.client.stat':true});
			if(park.count() == 0)
				return {
					name:	'null',
					city:	'null',
					address:'null',
					number:	'',
					zone:	'null',
					time:	'null',
					value:	'null'
				};

			park = park.fetch()[0].info;
			var cli_block;
			for(var x=0;x<park.client.length;x+=1){
				if(park.client[x].cpf == cli.cpf && park.client[x].stat == true){
					cli_block = park.client[x];
					break;
				}
			}
			var obj = {
				name:	park.name,
				city:	park.city,
				address:park.address,
				number:	park.number,
				zone:	park.zone,
				time:	date_calculator(cli_block.date)[0],
				value:	(1 + date_calculator(cli_block.date)[1]) * park.value
			};

			return obj;
		}
	});
	this.route('clientinfo',{
		path:'/clientinfo',
		data: function(){
			var cli = col_client.find(glocal('_login')._id);
			if(cli.count() != 1)
				return {'error':'Erro de autenticação'};
			cli = cli.fetch()[0];

			return cli;
		}
	});
});
