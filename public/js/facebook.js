window.SUPERTRUNFO = window.SUPERTRUNFO || {};
SUPERTRUNFO.APPS = SUPERTRUNFO.APPS || {};

SUPERTRUNFO.APPS.Facebook = {
	login: login = function(response) {
		if (response.authResponse) {
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
		} else {
			FB.login(SUPERTRUNFO.APPS.Facebook.login);
		}
	},
	init: function() {
		FB.init({
			appId : '369251863156901',
			channelUrl : '//neto.my.phpcloud.com/super-trunfo/',
			status : true,
			cookie : true,
			xfbml : true
		});
		
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				//TODO fazer o redirect
			} else if (response.status === 'not_authorized') {
				FB.login(SUPERTRUNFO.APPS.Facebook.login);
			} else {
				FB.login(SUPERTRUNFO.APPS.Facebook.login);
			}
			
			FB.Canvas.setSize({width: 850});
		});
	}
};

SUPERTRUNFO.APPS.Facebook.init();