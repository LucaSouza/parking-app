if(Meteor.isClient){
	Session.setDefault('error','');

	Template.regbike.helpers({
		sp_aval: function(){
			var store = glocal('_login');
			var block = col_parking.find({_id:store._id}).fetch();

			block = block[0].info.flows;

			var resp = [];
			for(var x=0;x<block.length;x+=1){
				if(block[x].stat)
					resp.push(block[x]);
			}

			return resp;
		},
		error: function(){
			return Session.get('error');
		}
	});
	Template.regbike.events({
		'submit .form_reg': function(evt){
			var cpf = parseInt(evt.target.cli_cpf.value);
			var color = evt.target.bike_color.value;
			var model = evt.target.model.value;
			var flow = parseInt(evt.target.space_avaliable.value);

			var tot_cli = col_client.find({cpf:cpf});

			if(tot_cli.count() != 1){
				Session.set('error', 'Cliente não Cadastrado ou CPF inválido');
				return false;
			}
			
			var client = new Object();
			var store = glocal('_login');
			var info = col_parking.find(store._id).fetch();
			var park_flow = info[0].info.flows;

			try{
				info = info[0].info.client;
			}catch(err){
				alert('Ocorreu um erro ao concluir o cadastro. Entre em contato com o desenvolvedor!');
				return false;
			}

			client = {
				cpf: cpf,
				bike_color: color,
				bike_model: model,
				flow: flow,
				date: new Date(),
				stat: true
			}

			info.push(client);

			park_flow[flow-1].stat = false;

			col_parking.update(store._id,{
				$set : {
					'info.client' : info,
					'info.flows' : park_flow
				}
			});

			return true;
		}
	});
}
