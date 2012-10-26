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
		
		FB.api('/me?fields=name,picture,location', function(response) {
			var userProfile = function(base) {
				var img = $(base + ' .user-photo img');
				
				img.attr('alt', response.name);
				img.attr('src', response.picture.data.url);
				
				FB.api('/'+response.location.id, function(location) {
					$('#cidades option').each(function(v) {
						var name = location.name.toLowerCase();
						var description = location.description.toLowerCase();
						var text = $(this).text().toLowerCase();
						
						if (name.indexOf(text) > -1 || description.indexOf(text) > -1) {
							$(this).attr('selected', 'selected');
						}
					});


					var data = {
					  "id": "100003087709183", 
					  "friends": {
					    "data": [
					      {
					        "name": "Ariane Brandão", 
					        "id": "521354854"
					      }, 
					      {
					        "name": "Betina Koelln", 
					        "id": "540972023"
					      }, 
					      {
					        "name": "Paulo Fernandes", 
					        "id": "553958901"
					      }, 
					      {
					        "name": "Robson Chimin", 
					        "id": "562114716"
					      }, 
					      {
					        "name": "Anderson Agustoni", 
					        "id": "591306748"
					      },
					      {
					        "name": "Robson Chimin", 
					        "id": "562114716"
					      }, 
					      {
					        "name": "Anderson Agustoni", 
					        "id": "591306748"
					      }
					    ]
					  }
					};


					SUPERTRUNFO.APPS.Facebook.friends(data);
				});
				
				$(base + ' .user-name').text(response.name);
			};
			
			userProfile('.user');
			userProfile('.score-me')
		});
		
		$('.send-request').on('click', SUPERTRUNFO.APPS.Facebook.sendRequest);
		jogo.init();
	},
	
	friends: function(response) {
		var items = '',
		list = response.friends.data,
		$gamesList = $('.games-list');


		$(list).each(function(v){
		  var $this = $(this)[0];

		   items += 
		   '<li class="games-item">'+
		        '<a class="game" href="#" title="">'+
		            '<span class="user-img"><img src="img/be.jpeg" alt="photo"></span>'+
		            '<span class="user-name" data-id="' + $this.id + '">' + $this.name + ' <span class="user-ranking">(3°)</span></span>'+
		            '<span class="score-opponent winning"><i class="ic-card"></i>80</span>'+

		            '<i class="ic-arrow"></i>'+
		        '</a>'+
		    '</li>';
		});

		$gamesList.empty().append(items);
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
				FB.login(SUPERTRUNFO.APPS.Facebook.login);
			} else {
				FB.login(SUPERTRUNFO.APPS.Facebook.login);
			}

			FB.Canvas.setSize({width: 850});
		});

	}
};

SUPERTRUNFO.APPS.Facebook.init();