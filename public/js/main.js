jQuery(function() {
	if(store.get('user') === undefined || jQuery.isEmptyObject(store.get('user'))) {
		loginScreen();
	} else {
		mainMenu();
	}
	// mainMenu();
});


const URL = 'http://localhost/TinderboxCI/';
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
	var user = store.get('user');  // example for calling data
	console.log("Main menu loaded!");
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
				+ '<button class="waves-effect waves-light btn btn-map">Map</button>'
				+ '<button class="waves-effect waves-light btn btn-chat">Chat</button>'
				+ '<button class="waves-effect waves-light btn btn-info">Info</button>'
				+ '<button class="waves-effect waves-light btn btn-faq">FAQ</button>'
				+ '<button class="waves-effect waves-light btn btn-logout">Logout</button>'
		
		jQuery('#app').html(html); //overwrites the content from the view
	};
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