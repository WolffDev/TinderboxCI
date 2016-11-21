jQuery(function() {
	if(store.get('user') === undefined || jQuery.isEmptyObject(store.get('user'))) {
		loginScreen();
	} else {
		mainMenu();
	}
	// mainMenu();
});

const URL = 'http://localhost:8888/tissekone/';
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
								+'<input id="email" name="email" type="email" class="" required>'
								+'<label for="email">Email</label>'
							+'</div>'
						+'</div>'
						+'<div class="row">'
							+'<div class="input-field col s12">'
								+'<input id="password" name="password" type="password" class="" required>'
								+'<label for="password">Password</label>'
								+'<div class="forgot-pw">'
									+'<a href="#">Forgot Password?</a>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'</div class="row">'
							+'<div class="col s12 center">'
								+'<button class="btn waves-effect waves-dark btn-login-submit">'
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



/*=====  End of Topnavigation  ======*/


/*=============================================
=            Mainmenu                        =
=============================================*/

function mainMenu() {
	var user = store.get('user');
	console.log("Main menu loaded!");
// <<<<<<< HEAD
	// jQuery.ajax({
	// 	url: URL + 'api/shifts/', //load token
	// 	contentType: 'application/json',
	// 	type: 'GET',
	// 	success: function(data, status, response)
	// 	{
	// 		console.log(data);
	// 		var html = '<h1>Mainmenu</h1>'
	// 				+ '<button class="waves-effect waves-light btn btn-map">Map</button>'
	// 				+ '<button class="waves-effect waves-light btn btn-chat">Chat</button>'
	// 				+ '<button class="waves-effect waves-light btn btn-info">Info</button>'
	// 				+ '<button class="waves-effect waves-light btn btn-faq">FAQ</button>';

	// 		jQuery('#app').html(html); //overwrites the content from the view
	// 	}
	// })
// =======
	jQuery.ajax({
		beforeSend: function(xhr) {
			xhr.setRequestHeader("SecretToken", user.token);
		},
		url: URL + 'api/users', //load token
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
		},
		error: function(xhr, status, error) {
			var err = JSON.parse(xhr.responseText);
			responseHandling(err);
		}
	}).done(function() {
		loadMainMenu();
	});

	function loadMainMenu() {
		var html =
			'<h1>Mainmenu</h1>'
				+ '<button class="waves-effect waves-light btn btn-map">Map</button>'
				+ '<button class="waves-effect waves-light btn btn-chat">Chat</button>'
				+ '<button class="waves-effect waves-light btn btn-info">Info</button>'
				+ '<button class="waves-effect waves-light btn btn-faq">FAQ</button>'
				+ '<button class="waves-effect waves-light btn btn-logout">Logout</button>';
		jQuery('#app').html(html); //overwrites the content from the view
	};
// >>>>>>> 89aa0a32f9595de854a9a88d7ceabd438386c52f
};


function map() {
	html = '<h1>MAP</h1>';
	html += '<button class="btn waves-effect btn-back">Back</button>';
	jQuery('#app').html(html); //overwrites the content from the view
};

function chat() {
	html = '<h1>CHAT</h1>';
	html += '<button class="btn waves-effect btn-back">Back</button>';
	jQuery('#app').html(html); //overwrites the content from the view
}

function information() {
	html = '<h1>INFORMATION</h1>';
	html += '<button class="btn waves-effect btn-back">Back</button>';
	jQuery('#app').html(html); //overwrites the content from the view
}

function faq() {
	html = '<h1>FAQ</h1>';
	html += '<button class="btn waves-effect btn-back">Back</button>';
	jQuery('#app').html(html); //overwrites the content from the view
}


/*=====  End of Mainmenu  ======*/

/*==================================
=            Burgermenu            =
==================================*/
function changeImage() {
	var html = '<h1>changeImage</h1>';
	jQuery('#app').html(html); //overwrites the content from the view
};

function settings() {
	var html = '<h1>Settings</h1>';
	jQuery('#app').html(html); //overwrites the content from the view
};

function notification() {
	var html = '<h1>notification</h1>';
	jQuery('#app').html(html); //overwrites the content from the view
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
jQuery('#app').on('click', '.btn-logout', loginScreen);