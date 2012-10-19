window.SUPERTRUNFO = window.SUPERTRUNFO || {};
SUPERTRUNFO.APPS = SUPERTRUNFO.APPS || {};

SUPERTRUNFO.APPS.Facebook = {
	sendRequest: function() {
		FB.ui({method: 'apprequests',
			message: 'Conheça o Super Trunfo da Política usando dados abertos segundo a Lei no 12.527, de 18 de novembro de 2011.'
		});
	},
	updateGUIAndInit: function() {
		var jogo = new SUPERTRUNFO.APPS.Jogo();

		FB.api('/me?fields=name,picture', function(response) {
			var userProfile = function(base) {
				var img = $(base + ' .user-photo img');
				
				img.attr('alt', response.name);
				img.attr('src', response.picture.data.url);
				
				$(base + ' .user-name').text(response.name);
			};
			
			userProfile('.user');
			userProfile('.score-me')
		});
		
		$('.send-request').on('click', SUPERTRUNFO.APPS.Facebook.sendRequest);
		jogo.init();
	},
	login: function(response) {
		if (response.authResponse) {
			SUPERTRUNFO.APPS.Facebook.updateGUIAndInit();
		} else {
			FB.login(SUPERTRUNFO.APPS.Facebook.login);
		}
	},
	init: function() {
		FB.init({
			appId : '369251863156901',
			channelUrl : '//neto.my.phpcloud.com/super-trunfo/',
			frictionlessRequests : true,
			status : true,
			cookie : true,
			xfbml : true
		});
		
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				SUPERTRUNFO.APPS.Facebook.updateGUIAndInit();
			} else if (response.status === 'not_authorized') {
			} else {
				FB.login(SUPERTRUNFO.APPS.Facebook.login);
			}
			
			FB.Canvas.setSize({width: 850});
		});
	}
};

SUPERTRUNFO.APPS.Facebook.init();