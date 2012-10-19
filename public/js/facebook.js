FB.init({
	appId : '369251863156901',
	channelUrl : '//neto.my.phpcloud.com/super-trunfo/',
	status : true,
	cookie : true,
	xfbml : true
});

FB.Canvas.setSize({width: 850});

FB.login(function(response) {
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
		//TODO: usuário não autorizou, o que fazemos?
	}
});