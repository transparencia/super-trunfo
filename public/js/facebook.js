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
			console.log([response.name, response.picture.data.url]);
			var img = $('.user .user-photo img');
			
			img.attr('alt', response.name);
			img.attr('src', response.picture.data.url);
			
			$('.user .user-name').text(response.name);
		});
	} else {
		//TODO: usuário não autorizou, o que fazemos?
	}
});