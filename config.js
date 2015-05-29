if(Meteor.isClient){
	Template.body.rendered = function(){
		var win_w = window.innerWidth;
		$("header").width(win_w);
		$("main").width(win_w);
		$('footer').width(win_w);
		$('header input').width(win_w - win_w*0.05);
		$('header form *').height($('header').height()*0.6);

	};
}
