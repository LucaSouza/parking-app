if(Meteor.isClient){

	Session.setDefault('cli_info',null);
	Session.setDefault('submit',false);
	Session.setDefault('action',null);
	Session.setDefault('money_ret',0);
	Session.setDefault('error',null);

	_client_data = function(){
		var cpf = parseInt($("[name='cli_cpf']").val());
		var client = col_client.find({cpf:cpf});
		var parking = col_parking.find(glocal('_login')._id);

		if(client.count() != 1){
			Session.set('error','Cliente inesistente');
			return false;
		}
		if(parking.count() != 1){
			Session.set('error','Erro de autenticação. Contate o desenvolvedor');
			return false;
		}

		client = client.fetch()[0];
		parking = parking.fetch()[0].info;
		var cli_info = new Object();

		for(var x=0;x< parking.client.length; x+=1){
			if(parking.client[x].cpf == cpf && parking.client[x].stat == true){
				if(Session.get('action') == 'floap'){
					Session.set('action','');
					parking.client[x].stat = false;
					parking.flows[parking.client[x].flow -1].stat = true;
					if(col_parking.update(glocal('_login')._id,{
						$set:{
							'info.client': parking.client,
							'info.flows': parking.flows
						}
					}) == 0)
						return false;

					return true;
				}
				cli_info['name'] = client.name,
				cli_info['color'] = parking.client[x].bike_color,
				cli_info['model'] = parking.client[x].bike_model,
				cli_info['time'] = date_calculator(parking.client[x].date)[0];
				cli_info['value'] = parking.value;
				cli_info['cli_value'] = parking.value * (date_calculator(parking.client[x].date)[1] + 1);
				cli_info['flow'] = parking.client[x].flow;
				break;
			}
		}

		if(cli_info['name'] == null)
			return null;

		return [cli_info];
	};

	Template.retbike.helpers({
		cli_info: function(){
			return Session.get('cli_info');
		},
		money_ret: function(){
			return Session.get('money_ret');
		},
		error: function(){
			return Session.get('error');
		}
	});

	Template.retbike.events({
		'submit .form_ret': function(evt){
			if(Session.get('submit') == false){
				var block = _client_data();

				Session.set('cli_info',block);
				return false;
			}

			var cli_info = Session.get('cli_info');
			var money = _money.real_2_float(evt.target.money.value);

			if(money < cli_info[0].value){
				Session.set('error','Valor de pagamento inválido');
				Session.set('submit',false);
				return false;
			}

			Session.set('action','floap');

			return _client_data();
		},
		'click .submit':function(){
			Session.set('submit',true);
		},
		'keyup .money': function(){
			var _new = Session.get('cli_info');
			var money = _money.real_2_float($('.money').val());
			
			this.cli_value = money - this.value;
			Session.set('money_ret', _money.float_2_real(this.cli_value.toFixed(2)));

			if(money < 0)
				return false;
		}
	});

}
