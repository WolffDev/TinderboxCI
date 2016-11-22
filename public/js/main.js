jQuery(function() {
	if(store.get('user') === undefined || jQuery.isEmptyObject(store.get('user'))) {
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
=            Back Navigation            =
=====================================*/
function backNav(title) {
	var html =
		'<header class="z-depth-2">'
			+'<div class="arrow-back btn-back">'
				+'<img src="">'
			+'</div>'
			+'<div class="a-nav-header-text">'
				+'<h4>'+ title +'</h4>'
			+'</div>'
		+'</header>'

	return html;
}


/*=====  End of Back Navigation  ======*/


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
		url: URL + 'api/shifts/' + user.userid, //load token
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response) {
		},
		error: function(xhr, status, error) {
			var err = JSON.parse(xhr.responseText);
			responseHandling(err);
		}
	}).done(function(data) {
		loadMainMenu(data);
	});

	function loadMainMenu(shifts) {
		var user = store.get('user');
		console.log(shifts);
		var header =
		'<input type="checkbox" id="sidebarToggler">'
		+'<header class="z-depth-2">'
			+'<div class="logo">'
				+'<img src="'+ RESS +'img/logo.png">'
			+'</div>'
			+'<label class="toggle-sidebar" for="sidebarToggler">'
				+'<img src="'+ RESS +'img/menu.png" alt="" style="padding-top: 15px;">'
			+'</label>'

			+'<div class="sidebar z-depth-2">'
				+'<label class="toggle-close" for="sidebarToggler">✕</label>'
				+'<div class="sidebar-wrapper">'
					+'<div class="sidebar-profile">'
						+'<img src="'+ RESS +'img/user.jpg" alt="">'
						+'<h2>'
							+ user.firstname
						+'</h2>'
						+'<p>'
							+ user.email
						+'</p>'
					+'</div>'
					+'<div class="sidebar-links">'
						+'<ul>'
							+'<li class="btn-notification">'
								+'<img src="'+ RESS +'img/alarm.svg">Noticication'
							+'</li>'
							+'<li class="btn-settings">'
								+'<img src="'+ RESS +'img/settings.svg">Settings'
							+'</li>'
							+'<li class="btn-logout">'
								+'<img src="'+ RESS +'img/exit.svg">Logout'
							+'</li>'
						+'</ul>'
					+'</div>'
					+'<div class="sidebar-copy">'
						+'<p>Tinderbox &copy; 2017<br>Version: Bravo Two Zero</p>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</header>';

		var html =
			'<h1>Mainmenu</h1>'
				+ '<button class="waves-effect waves-light btn btn-map">Map</button>'
				+ '<button class="waves-effect waves-light btn btn-chat">Chat</button>'
				+ '<button class="waves-effect waves-light btn btn-info">Info</button>'
				+ '<button class="waves-effect waves-light btn btn-faq">FAQ</button>';
		var sendHtml = header + html;
		jQuery('#app').html(sendHtml); //overwrites the content from the view
	};
};

function map() {
	var html =
		'<h1>MAP</h1>'
		+'<button class="btn waves-effect btn-back">Back</button>';
	var sendHtml = backNav('Map') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
};

function chat() {
	var html =
		'<h1>CHAT</h1>'
		+'<button class="btn waves-effect btn-back">Back</button>';
	var sendHtml = backNav('Chat') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
}

function information() {
	var html =
		'<h1>INFORMATION</h1>'
		+'<button class="btn waves-effect btn-back">Back</button>';
	var sendHtml = backNav('Information') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
}

function faq() {
	var html =
		'<h1>FAQ</h1>'
		+'<button class="btn waves-effect btn-back">Back</button>';
	var sendHtml = backNav('Faq') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
}


/*=====  End of Mainmenu  ======*/

/*==================================
=            Burgermenu            =
==================================*/
function changeImage() {
	var html =
		'<h1>changeImage</h1>'
		+'<button class="btn waves-effect btn-back">Back</button>';
	var sendHtml = backNav('Change Image') + html;
	jQuery('#app').html(sendhtml); //overwrites the content from the view
};

function settings() {
	var html =
		'<h1>Settings</h1>'
		+'<button class="btn waves-effect btn-back">Back</button>';
	var sendHtml = backNav('Settings') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
};

function notification(event) {
	var html =
		'<h1>notification ' + event.data.title + '</h1>'
		+'<button class="btn waves-effect btn-back">Back</button>';
	var sendHtml = backNav('Notification') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
};


/*=====  End of Burgermenu  ======*/


/**================================================== *
 * ==========  Custom Functions  ========== *
 * ================================================== */
function responseHandling(data){
	Materialize.toast(data.message, 4000);
}

/* =======  End of Custom Functions  ======= */


/**================================================== *
 * ==========  Buttons  ========== *
 * ================================================== */
jQuery('#app').on('click', '.btn-login-submit', login);
jQuery('#app').on('click', '.btn-map', map);
jQuery('#app').on('click', '.btn-chat', chat);
jQuery('#app').on('click', '.btn-info', information);
jQuery('#app').on('click', '.btn-faq', faq);
jQuery('#app').on('click', '.btn-back', mainMenu);
jQuery('#app').on('click', '.btn-notification', {title: "notification"}, notification);
jQuery('#app').on('click', '.btn-settings', settings);
jQuery('#app').on('click', '.btn-logout', loginScreen);

/* =======  End of Buttons  ======= */
