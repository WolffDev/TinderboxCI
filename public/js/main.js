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
	var html =
		'<button class="btn waves-effect btn-back">Back</button>'
			+'<div class="row faq-container">'
				+'<div class="col s12">'
					+'<ul class="collapsible" data-collapsible="accordion">'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>To be a volunteer</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>• You are a part of a team and a community of 5000 people.'
									+'<br>'
									+'• You are a part of getting the wheels to go around'
									+'<br>'
									+'• As a volunteer, you have actively agreed to perform with a personal commitment, where you first and foremost must have fun,'
									+' but also to deliver across Tinderbox, your team, your team leader and your area. You have to be responsible.'
									+'<br>'
									+'• We are counting on you, and you can count on us.'
									+'<br>'
									+'• Learn about our Terms & Conditions, please read our FAQ and be prepared before you show up for your first shift.</p>'
								+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>RULES OF ENGAGEMENT</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>• By signing up you agreed of our rules of engagement.'
				      				+'<br>'
				      				+'• If you forgot them or just want to read them again, they are available here:'
				      				+'www.tinderbox.dk/en/volunteers/rules-of-engagement/ </p>'
			      			+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>DEADLINE FOR DEREGISTRATION</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>By the 1st of June 2016, you cannot opt out without getting incontact with your team leader.'
			      					+'Read more in our FAQ.</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>SHIFTS</div>'
			      				+'<div class="collapsible-body">'
				      				+'<p>• You may never be absent for a shift without being in contact with your team leader.'
				      				+'<br>'
				      				+'• In case of acute illness or unexpected events or otherwiseyou must notify your team leader as soon as possible.'
				      				+'<br>'
				      				+'• You will find the contact information for your team leader in RUBY by clicking on “MY TEAMS”.'
				      				+'<br>'
				      				+'• Tinderbox may in specific cases require showing of a medical report. You are responsible for obtaining a medical report and' 
				      				+'have to cover the expenses if there are any.</p>'
			      				+'</div>'
						+'</li>'
						+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>ALCOHOL POLICY</div>'
			      				+'<div class="collapsible-body">'
				      				+'<p>• You may not be influenced by alcohol on your shift!'
				      				+'<br>'
				      				+'• You may not drink alcohol on your shift!</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>VALUABLES</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>• Valuables brought to Tinderbox are at your own risk, and our insurance does not cover damages or loss'
									+'<br>'
									+'• Read more here: www.tinderbox.dk/en/info/</p>'
								+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>CLOTHING</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>• The provided t-shirt must be worn when on duty. It shouldnot be worn when you are off.'
			      					+'<br>'
			      					+'• Always make sure to bring practical clothing and footwear.</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>MEALS FOR VOLUNTEERS</div>'
				      			+'<div class="collapsible-body">'
				      				+'<p>• All volunteers can get sandwiches during their shifts'
				      				+'<br>'
				      				+'• Before/after volunteers will have access to 4 sandwiches.'
				      				+'<br>'
				      				+'• During volunteers will have access to 2 sandwiches.'
				      				+'<br>'
				      				+'• Make sure you eat from home.'
				      				+'<br>'
				      				+'• Volunteers are allowed to bring food, fruit and snacks.'
				      				+'<br>'
				      				+'• In conjunction with the festival a kiosk will be set up, and volunteers can buy crisps, candy and chocolate.</p>'
				      			+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>VOLUNTEER LOUNGE</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>• At Tinderbox there is an area exclusively for volunteers. In the Lounge you will find:'
			      					+'• Bar'
			      					+'<br>'
			      					+'• Supply of sandwiches'
			      					+'<br>'
			      					+'• Hotdog stand'
			      					+'<br>'
			      					+'• Kiosk'
			      					+'<br>'
			      					+'• Information'
			      					+'<br>'
			      					+'• Toilets'
			      					+'<br>'
			      					+'• Water stations'
			      					+'<br>'
			      					+'• Seating environments'
			      					+'<br>'
			      					+'• ...and of course a good atmosphere!'
			      					+'<br>'
			      					+'NOTICE! Volunteer Lounge has a new location – orient yourselfon the map in this guide</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>WARDROBE</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>In the Volunteer Lounge there is a wardrobe only for volunteers. Here you can store coats and small bags.'
									+'Storage is at your own risk and wardrobes are not supervised outside opening hours.'
									+'The price of the cloakroom is 10 kroner per day.</p>'
			      				'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>ROSTERS</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>Your roster will be released during May. You can find it by logging on to RUBY and selecting “MY SHIFTS”</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>CHECK–IN</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>• NOTICE! New location. This year the Check-In for volunteers is placed in connection with the main entrance,'
									+' which is located by Falen. Orientate yourself in this guide.'
									+'<br>'
									+'• Before you can get onto the site, you have to go through our Check-In, where you must be wearing the wristband, '
									+'that gives you access to the festival site'
									+'<br>'
									+'• To check-in, you have to bring your ticket and picture-ID!'
									+'<br>'
									+'• You will find your ticket by logging on to RUBY and selecting ”MY TICKET”'
									+'<br>'
									+'• You can bring your ticket on smartphone or tablet'
									+'<br>'
									+'• Check-In is open during the construction days, during and after Tinderbox - see opening hours below.'
									+'<br>'
									+'• If you have a shift before Check-In opens, you will arrange a meeting point with your team leader, and he/she will '
									+'make sure that you get a temporary wristband.'
									+'<br>'
									+'• AVOID QUEUES!!! Get your bracelet on before Tinderbox. That way you will avoid possible queues at the Check-In in '
									+'the busy periods.'
									+'<br>'
									+'OPENING HOURS'
									+'<br>'
									+'• June 19 – 21: 08.00 – 20.00'
									+'<br>'
									+'• June 22: 07.00 – 20.00'
									+'<br>'
									+'• June 23: 07.00 – 24.00'
									+'<br>'
									+'• June 24: 08.00 – 24.00'
									+'<br>'
									+'• June 25: 08.00 – 20.00'
									+'<br>'
									+'• June 26: 09.00 – 12.00'
									+'<br>'
									+'ADDRESS: Tusindårsskoven, Falen, 5200 Odense V'
									+'(By the main entrance)</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>HYGIENE</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>Hygiene is a very important factor on Tinderbox. Everyone - especially volunteers who work with food MUST be extremely '
									+'aware of general and personal hygiene. Everyone, no matter where they work and what function they have, MUST know these rules:'
									+'• Wash your hands as often as possible - and then again.'
									+'<br>'
									+'• Do you have wounds, cuts, diarrhea, a runny nose or similar talk to your team leader'
									+'<br>'
									+'• If you have touched money, do not touch food.'
									+'<br>'
									+'• The bar counters are cleaned frequently - at least every 3 hours. Take a clean cloth each time and immediately put it '
									+'to wash after use.'
									+'<br>'
									+'• Meat must be heated to at least 75 degrees.'
									+'<br>'
									+'• The time between refrigerated/grilled to sale must be a maximum of 3 hours.'
									+'<br>'
									+'• Foods have queue behavior - first in, first out.'
									+'<br>'
									+'• And again - WASH YOUR HANDS!</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>SAFETY</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>• At Tinderbox there has been established a team consisting of professional security guards and well-trained first '
									+'aiders. Always follow references from security personnel.'
									+'<br>'
									+'• At the concert site, DO NOT contact 112! Contact the security staff on site. This is done through radio channel 1 '
									+'or 16. There are radios in all ports, stalls and bars.'
									+'<br>'
									+'• In case of fire you must immediately leave the site and contact security personnel via radio. Then you may try to '
									+'extinguish the fire, if it’s possible and safe.'
									+'<br>'
									+'• Do you, a colleague or a guest require first aiders, you should refer to the first-aiders station. Is it acute first '
									+'aiders can be called via radio channel 1 or 16.'
									+'<br>'
									+'• Fights, threats and similar is not accepted in any way. If you see or get involved in this you need to call the guards. '
									+'Always remember to keep well away from a fight and let the guards handle the situation.'
									+'<br>'
									+'• At Tinderbox work environment and safety for our volunteers is very important. We have made several initiatives to make '
									+'the safety of our volunteers as high as possible. However, we also encourage everyone to consider their own and others’ '
									+'safety. Use common sense on your own and others’ behalf, keep an eye on what is going on around you, so you can take care '
									+'of yourself and your colleagues.</p>'
			      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header white-text"><i class="material-icons">filter_drama</i>CONTACT INFORMATION</div>'
			      				+'<div class="collapsible-body">'
			      					+'<p>Tinderbox is held in Tusindårsskoven, Falen, 5200 Odense <V></V>'
									+'<br>'
									+'Volunteer: frivillig@tinderbox.dk'
									+'<br>'
									+'RUBY support: techsupport@tinderbox.dk'
									+'<br>'
									+'RUBY: ruby.tinderbox.dk'
									+'<br>'
									+'Facebook: www.facebook.com/tinderboxers/'
									+'<br>'
									+'Accommodation: www.tinderbox.dk/overnatning/'
									+'<br>'
									+'Accommodation (Facebook): www.facebook.com/events/508759709291144/ </p>'
			      				+'</div>'
			    		+'</li>'
			    	+'</ul>'
			    +'</div>'
			+'</div>';
	jQuery('#app').html(html); //overwrites the content from the view
	 $('.collapsible').collapsible();
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