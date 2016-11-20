jQuery(function() {
	if(store.get('user') === undefined) {
		loginScreen();
	} else {
		mainMenu();
	}
	// mainMenu();
});

const URL = 'http://webtinderbox:8888/';
const RESS = 'public/';

/*=============================
=          Welcome            =
=============================*/
function loginScreen() {
	storeCheck();
	localStorage.removeItem('user');
    function storeCheck() {
		// Use something else than alert()
        if (!store.enabled) {
            alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
            return false;
        }
    }

	var html = 
		'<div class="row">'
			+'<div class="col s12">'
				+'<div class="login-container">'
					+'<div class="login-logo center">'
						+'<img src="'+ RESS +'img/login-logo.png">'
					+'</div>'
					+'<div class="login-input">'
						+'<div class="row">'
							+'<div class="input-field col s12">'
								+'<input id="email" name="email" type="text" class="" required>'
								+'<label for="email">Email</label>'
							+'</div>'
						+'</div>'
						+'<div class="row">'
							+'<div class="input-field col s12">'
								+'<input id="password" name="password" type="password" class="" required>'
								+'<label for="password">Password</label>'
							+'</div>'
						+'</div>'
						+'</div class="row">'
							+'<div class="col s12 center">'
								+'<button class="btn waves-effect red waves-dark btn-login-submit">'
									+'Login'
								+'</button>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>';

	jQuery('#app').html(html);

}


/*=============================
=            Login            =
=============================*/

function login() {
	var email = jQuery('#email').val();
	var password = jQuery('#password').val();
	

	jQuery.ajax({
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(email + ":" + password));
		},
		url: URL + 'api/login',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
		},
		error: function(xhr, status, error) {
			var err = JSON.parse(xhr.responseText);
			responseHandling(err);
		}
	}).done(function(data, status, response) {
		store.set('user', {
				userid: data.userid,
				firstname: data.firstname,
				lastname: data.lastname,
				email: data.email,
				token: data.secretToken
			});
			mainMenu();
	});
};


/*=====  End of Login  ======*/


/*=====================================
=            Topnavigation            =
=====================================*/

function topNav() {
	jQuery.ajax({
		// url: URL + 'api/users',
		contentType: 'application/json',
		// type: 'GET',
		success: function(data, status, response) {
			var html = '<h1>topNav</h1>'
					+ '<button class="waves-effect waves-light btn btn-back">back</button>';

			jQuery('#app').html(html); //overwrites the content from the view
		}
	})
};


/*=====  End of Topnavigation  ======*/


/*=============================================
=            Mainmenu                        =
=============================================*/

function mainMenu() {
	var user = store.get('user');
	console.log("Main menu loaded!");
	jQuery.ajax({
		beforeSend: function(xhr) {
			xhr.setRequestHeader("SecretToken", user.token);
		},
		url: URL + 'api/users', //load token
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
			loadMainMenu();
		},
		error: function(xhr, status, error) {
			var err = JSON.parse(xhr.responseText);
			responseHandling(err);
		}
	});
	function loadMainMenu() {
		var html =
			'<h1>Mainmenu</h1>'
				+ '<button class="waves-effect waves-light btn btn-map">Map</button>'
				+ '<button class="waves-effect waves-light btn btn-chat">Chat</button>'
				+ '<button class="waves-effect waves-light btn btn-info">Info</button>'
				+ '<button class="waves-effect waves-light btn btn-faq">FAQ</button>';
		jQuery('#app').html(html); //overwrites the content from the view
	};
};


function map() {
	jQuery.ajax({
		url: URL + 'api/shifts/44',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
			var html = topNav();

			jQuery('#app').html(html); //overwrites the content from the view

		}
	})
};

function chat() {
	jQuery.ajax({
		url: URL + 'api/shifts/44',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
			var html = topNav();

			jQuery('#app').html(html); //overwrites the content from the view
		}
	})
}

function information() {
	jQuery.ajax({
		contentType: 'application/json',
		success: function() {
			var html = topNav();

			jQuery('#app').html(html); //overwrites the content from the view
		}
	})

}

function faq() {
	jQuery.ajax({
		contentType: 'application/json',
		success: function() {

			var html = topNav();
			html += '<h1>TEST</h1>';

			jQuery('#app').html(html); //overwrites the content from the view
		}
	})

}


/*=====  End of Mainmenu  ======*/

/*==================================
=            Burgermenu            =
==================================*/
function changeImage() {
	jQuery.ajax({
		url: URL + 'api/users',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
			var html = '<h1>changeImage</h1>';

			jQuery('#app').html(html); //overwrites the content from the view

		}
	})
};

function settings() {
	jQuery.ajax({
		url: URL + 'api/settings',
		contentType: 'application/json',
		type: 'PUT',
		success: function(data, status, response) {
			var html = '<h1>Settings</h1>';

			jQuery('#app').html(html); //overwrites the content from the view

		}
	})
};

function notification() {
	jQuery.ajax({
		url: URL + 'api/notification',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
			var html = '<h1>notification</h1>';

			jQuery('#app').html(html); //overwrites the content from the view

		}
	})
};


/*=====  End of Burgermenu  ======*/


function responseHandling(data){
	Materialize.toast(data.message, 4000);
}

/*==================================
=              BUTTONS             =
==================================*/

jQuery('#app').on('click', '.btn-login-submit', login);
jQuery('#app').on('click', '.btn-map', map);
jQuery('#app').on('click', '.btn-chat', chat);
jQuery('#app').on('click', '.btn-info', information);
jQuery('#app').on('click', '.btn-faq', faq);
jQuery('#app').on('click', '.btn-back', mainMenu);