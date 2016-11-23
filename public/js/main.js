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
				+'<img src="'+ RESS +'img/back-arrow.svg">'
			+'</div>'
			+'<div class="nav-header-text">'
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
			'<div class="main-content">'
				    + '<h1 class="h1-title">YOUR SCHEDULE</h1>'
				    + '<div class="card-bg">'
				        + '<div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 300px; min-height: 110px; overflow: hidden; visibility: hidden;">'		            
				            + '<div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 300px; min-height: 110px; overflow: hidden;">'
							
				                + '<div data-p="225.00" style="display: none;">'
				                    + '<div class="shift-container">'
				                        + '<div class="card-third-1">'
				                            + '<div class="date">'
				                                + '<p class="p-date">15</p>'
				                            + '</div>'
				                            + '<div class="date">'
				                                + '<p class="p-day">SAT</p>'
				                                + '<p class="p-month">JUL</p>'
				                            + '</div>'
				                        + '</div>'
				                        + '<div class="card-third-2">'
				                            + '<p class="p-hours">16:00 - 22:00</p>'
				                            + '<p class="p-work-info">Bar 7 - Bartender</p>'
				                        + '</div>'
				                        + '<div class="card-third-3">'
				                            + '<div class="slider-map-icon">'
				                                + '<img src="'+ RESS +'img/map2.svg">'
				                            + '</div>'
				                            + '<div class="card-third-3-holder">'
				                                + '<p class="p-see">SEE</p>'
				                                + '<p class="p-map"> MAP</p>'
				                            + '</div>'
				                        + '</div>'
				                    + '</div>'
				                + '</div>'

				                + '<div data-p="225.00" style="display: none;">'
				                    + '<div class="shift-container">'
				                        + '<div class="card-third-1">'
				                            + '<div class="date">'
				                                + '<p class="p-date">17</p>'
				                            + '</div>'
				                            + '<div class="date">'
				                               + '<p class="p-day">MON</p>'
				                               + '<p class="p-month">JUL</p>'
				                            + '</div>'
				                        + '</div>'
				                        + '<div class="card-third-2">'
				                            + '<p class="p-hours">16:00 - 22:00</p>'
				                            + '<p class="p-work-info">Res 9 - Cleaner</p>'
				                        + '</div>'
				                        + '<div class="card-third-3">'
				                            + '<div class="slider-map-icon">'
				                                + '<img src="'+ RESS +'img/map2.svg">'
				                            + '</div>'
				                            + '<div class="card-third-3-holder">'
				                                + '<p class="p-see">SEE</p>'
				                                + '<p class="p-map"> MAP</p>'
				                            + '</div>'
				                        + '</div>'
				                    + '</div>'
				                + '</div>'
				                + '<div data-p="225.00" style="display: none;">'
				                    + '<div class="shift-container">'
				                        + '<div class="card-third-1">'
				                            + '<div class="date">'
				                                + '<p class="p-date">20</p>'
				                            + '</div>'
				                            + '<div class="date">'
				                                + '<p class="p-day">THU</p>'
				                                + '<p class="p-month">JUL</p>'
				                            + '</div>'
				                        + '</div>'
				                        + '<div class="card-third-2">'
				                            + '<p class="p-hours">20:00 - 23:50</p>'
				                            + '<p class="p-work-info">Bar 11 - Bartender</p>'
				                        + '</div>'
				                        + '<div class="card-third-3">'
				                            + '<div class="slider-map-icon">'
				                                + '<img src="'+ RESS +'img/map2.svg">'
				                            + '</div>'
				                            + '<div class="card-third-3-holder">'
				                                + '<p class="p-see">SEE</p>'
				                                + '<p class="p-map"> MAP</p>'
				                            + '</div>'
				                        + '</div>'
				                    + '</div>'
				                + '</div>'
				                + '<div data-p="225.00" style="display: none;">'
				                    + '<div class="shift-container">'
				                        + '<div class="card-third-1">'
				                            + '<div class="date">'
				                                + '<p class="p-date">24</p>'
				                            + '</div>'
				                            + '<div class="date">'
				                                + '<p class="p-day">SAT</p>'
				                                + '<p class="p-month">JUL</p>'
				                            + '</div>'
				                        + '</div>'
				                        + '<div class="card-third-2">'
				                            + '<p class="p-hours">09:00 - 14:00</p>'
				                            + '<p class="p-work-info">Bar 1 - Cleaner</p>'
				                        + '</div>'
				                        + '<div class="card-third-3">'
				                            + '<div class="slider-map-icon">'
				                                + '<img src="'+ RESS +'img/map2.svg">'
				                            + '</div>'
				                            + '<div class="card-third-3-holder">'
				                                + '<p class="p-see">SEE</p>'
				                                + '<p class="p-map"> MAP</p>'
				                            + '</div>'
				                        + '</div>'
				                    + '</div>'
				                + '</div>'
				            + '</div>' 
				            + '<div data-u="navigator" class="jssorb05" style="bottom:16px;right:6px;" data-autocenter="1">'
				                + '<div data-u="prototype" style="width:16px;height:16px;"></div>'
				            + '</div>'
				        + '</div>'
				        + '<hr>'
				        + '<div class="show-more">'
				            + '<div class="p-weather-days-third">'
				                + '<h1 class="p-weather-days">NOW</h1>'
				            + '</div>'
				            + '<div class="p-weather-days-third">'
				                + '<h1 class="p-weather-days">1 HOUR</h1>'
				            + '</div>'
				        + '<div class="p-weather-days-third">'
				                + '<h1 class="p-weather-days">2 HOURS</h1>'
				            + '</div>'
				            + '<div class="weather-container">'
				                + '<div class="weather-third">'
				                    + '<img src="'+ RESS +'img/weather.svg">'
				                + '</div>'
				            + '</div>'
				            + '<div class="p-weather-days-third">'
				                + '<h1 class="p-weather-degree">22°C</h1>'
				            + '</div>'
				            + '<div class="p-weather-days-third">'
				               + ' <h1 class="p-weather-degree">20°C</h1>'
				            + '</div>'
				        + '<div class="p-weather-days-third">'
				                + '<h1 class="p-weather-degree">19°C</h1>'
				            + '</div>'
				            + '<div class="weather-container">'
				            + '</div>'
				        + '</div> <!-- show more END -->'
				        + '<h1 class="expand">SHOW MORE</h1>' 				   
				    + '</div>'
				+ '</div>'

				+ '<script>jssor_1_slider_init();</script>'

				/*+ '<script>src="'+ RESS +'js/expand.js"</script>';*/

				+ '<script>$( ".expand" ).click(function() {$( ".show-more" ).toggle( "slow" );});</script>'

				+ '<h1>Mainmenu</h1>'

				+ '<div class="main-menu-left">'
					+ '<button class="btn-flat btn-map">Map<div class="main-menu-icon"></div></button>'
				+ '</div>'
				+ '<div class="main-menu-right">'
					+ '<button class="waves-effect waves-light btn btn-chat">Chat</button>'
				+ '</div>'
				+ '<div class="main-menu-left">'
					+ '<button class="waves-effect waves-light btn btn-info">Info</button>'
				+ '</div>'
				+ '<div class="main-menu-right">'
					+ '<button class="waves-effect waves-light btn btn-faq">FAQ</button>'
				+ '</div>';
				
		var sendHtml = header + html;
		jQuery('#app').html(sendHtml); //overwrites the content from the view
	};
};

function map() {
	var html;
	var sendHtml = backNav('Map') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
};

function chat() {
	var html;
	var sendHtml = backNav('Chat') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
}

function information() {
	var html;
	var sendHtml = backNav('Information') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
}

function faq() {
	var html;
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
	var html;
	var sendHtml = backNav('Settings') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
};

function notification(event) {
	var html =
		'<h1>notification ' + event.data.title + '</h1>';
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
