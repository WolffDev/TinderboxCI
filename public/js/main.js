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
								+'<input id="email" name="email" type="email" class="" required tabindex="1">'
								+'<label for="email">Email</label>'
							+'</div>'
						+'</div>'
						+'<div class="row">'
							+'<div class="input-field col s12">'
								+'<input id="password" name="password" type="password" class="" required tabindex="2">'
								+'<label for="password">Password</label>'
								+'<div class="forgot-pw">'
									+'<a href="#">Forgot Password?</a>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'</div class="row">'
							+'<div class="col s12 center">'
								+'<button class="btn waves-effect waves-dark btn-login-submit" tabindex="3">'
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
		url: encodeURI(URL + 'api/login'),
        // contentType: "application/x-www-form-urlencoded", //added this
		dataType: 'json',
		method: 'GET',
		success: function(data, status, response) {
		},
		error: function(xhr, status, error) {
		
			// var err = JSON.parse(xhr);
			// responseHandling(err);
		}
	}).done(function(data, status, response) {
		store.set('user', {
				userid: data.userid,
				firstname: data.firstname,
				lastname: data.lastname,
				email: data.email,
				token: data.Secrettoken
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
		headers: {
			'Secrettoken': user.token
		},
		url: encodeURI(URL + 'api/shifts/' + user.userid), //load token
		dataType: 'json',
		method: 'GET',
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
							// +'<li class="btn-notification">'
							// 	+'<img src="'+ RESS +'img/alarm.svg">Noticication'
							// +'</li>'
							// +'<li class="btn-settings">'
							// 	+'<img src="'+ RESS +'img/settings.svg">Settings'
							// +'</li>'
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

		var slider =
			'<div class="main-content">'
				    + '<h1 class="schedule">SCHEDULE</h1>'
				    + '<div class="card-bg">'
				        + '<div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 300px; min-height: 110px; overflow: hidden; visibility: hidden;">'		            
				            + '<div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 300px; min-height: 110px; overflow: hidden;">';
								
		var i;
		for(i = 0; i < shifts.length; i++) {
			var ts = shifts[i].shift_start.split(/[- :]/);
			var shift_start = new Date(Date.UTC(ts[0], ts[1]-1, ts[2], ts[3], ts[4], ts[5]));
			var shift_start = shift_start.toString();

			var te = shifts[i].shift_end.split(/[- :]/);
			var shift_end = new Date(Date.UTC(te[0], te[1]-1, te[2], te[3], te[4], te[5]));
			var shift_end = shift_end.toString();


			var shiftStartDay = shift_start.substring(0, 3);
			var shiftStartDate = shift_start.substring(8, 10);
			var shiftStartMonth = shift_start.substring(4, 7);
			var shiftStartTime = shift_start.substring(16, 21);
			var shiftEndTime = shift_end.substring(16, 21);
			var shiftTitle = shifts[i].shift_name;
			var shiftStation = shifts[i].shift_station;
			var shiftMapLocation = shifts[i].shift_location;
			var shiftContent = shifts[i].shift_content;

			slider += '<div data-p="225.00" style="display: none;">'
					+ '<div class="shift-container">'
						+ '<div class="card-third-1">'
							+ '<div class="date">'
								+ '<p class="p-date">'+ shiftStartDate +'</p>'
							+ '</div>'
							+ '<div class="date">'
								+ '<p class="p-day">'+ shiftStartDay +'</p>'
								+ '<p class="p-month">'+ shiftStartMonth +'</p>'
							+ '</div>'
						+ '</div>'
						+ '<div class="card-third-2">'
							+ '<p class="p-hours">'+ shiftStartTime + ' - ' + shiftEndTime +'</p>'
							+ '<p class="p-work-info-rosa">'+ shiftStation + '</p> <p class="p-work-info-azur">' + shiftTitle +'</p>'
						+ '</div>'
						+ '<div class="card-third-3 btn-shift-map" data-location="'+ shiftMapLocation +'">'
							+ '<div class="slider-map-icon">'
								+ '<img src="'+ RESS +'img/map2.svg">'
							+ '</div>'
							+ '<div class="card-third-3-holder">'
								+ '<p class="p-see">SEE</p>'
								+ '<p class="p-map"> MAP</p>'
							+ '</div>'
						+ '</div>'
					+ '</div>'
				+ '</div>';
		}

		var showMore = '</div>'
			+ '<div data-u="navigator" class="jssorb05" style="bottom:16px;right:6px;" data-autocenter="1">'
				+ '<div data-u="prototype" style="width:16px;height:16px;"></div>'
			+ '</div>'
			+ '</div>'
			+ '<hr>'
			+ '<div class="show-more">'
				+ '<div id="weather-container">'
					+ '<p>Reload the page to recieve weather updates</p>'
				+ '</div>'
			+ '</div> <!-- show more END -->'
			+ '<h1 class="expand">SHOW WEATHER</h1>' 				   
			+ '</div>'
		+ '</div>';

		var mainMenu = '<h1 class="h1-title"></h1>'
		+ '<div class="main-menu-left">'
			+ '<button class="btn-flat btn-map btn waves-effect waves-yellow">'
				+ '<div class="main-menu-icon">'
					+ '<img src="'+ RESS +'img/map-location.svg">'
				+ '</div>'
				+ '<h1 class="tile-title">MAP</h1>'
			+ '</button>'
		+ '</div>'
		+ '<div class="main-menu-right">'
			+ '<button class="btn-flat btn-chat btn waves-effect waves-yellow">'
				+ '<div class="main-menu-icon">'
					+ '<img src="'+ RESS +'img/chat.svg">'
				+ '</div>'
				+ '<h1 class="tile-title">Chat</h1>'
			+ '</button>'
		+ '</div>'
		+ '<div class="main-menu-left">'
			+ '<button class="btn-flat btn-info btn waves-effect waves-yellow">'
				+ '<div class="main-menu-icon">'
					+ '<img src="'+ RESS +'img/info.svg">'
				+ '</div>'
				+ '<h1 class="tile-title">Info</h1>'
			+ '</button>'
		+ '</div>'
		+ '<div class="main-menu-right">'
			+ '<button class="btn-flat btn-faq btn waves-effect waves-yellow">'
				+ '<div class="main-menu-icon">'
					+ '<img src="'+ RESS +'img/FAQ.svg">'
				+ '</div>'
				+ '<h1 class="tile-title">FAQ</h1>'
			+ '</button>'
		+ '</div>';
				
		var sendHtml = header + slider + showMore + mainMenu;
		jQuery('#app').html(sendHtml); //overwrites the content from the view
		jssor_1_slider_init();
		if(store.get('tinderboxWeather') === undefined || jQuery.isEmptyObject(store.get('tinderboxWeather'))) {
			getWeather();
		} 

		if(store.get('tinderboxWeather') !== undefined) {
			var checkDate = new Date(new Date().valueOf());
			var localWeather = store.get('tinderboxWeather');
			var storeDate = localWeather[1].unixTime - (60*60);
			var convertStoreDate = new Date(storeDate*1000);

			if(checkDate > convertStoreDate) {
				localStorage.removeItem('tinderboxWeather');
				getWeather();
				insertWeather();
			} else {
				insertWeather();
			}
		}
		
		
		
		jQuery(".expand").click(function() {
			if (jQuery.trim(jQuery(this).text()) === 'SHOW WEATHER') {
				jQuery(this).text('SHOW LESS');
			} else {
				jQuery(this).text('SHOW WEATHER');        
			}
			jQuery(".show-more").toggle("slow");
		});
	};
};

function getWeather() {
	console.log("getWeather called!");
	jQuery.ajax({
		url: 'http://api.openweathermap.org/data/2.5/forecast?appid=86c5feb02fda028e8f79c6ad579e066e&id=2615876&units=metric',
		// contentType: 'application/json',
		dataType: 'json',
		method: 'GET',
		success: function(data, status, response) {
        },
        error: function(xhr, status, error) {
		}
	}).done(function(data) {
		loadWeather(data);
	});
}

function loadWeather(data) {
	var data = data;

	function handleWeather(data) {
		weatherArr = [];
		var i;
		for(i = 0; i < data.list.length; i++) {
			var obj = {};
			obj['date'] = data.list[i].dt_txt; //date in clear text
			obj['unixTime'] = data.list[i].dt; // date in unix time stamp
			obj['weatherDesc'] = data.list[i].weather[0].description; // weather with more description
			obj['weather'] = data.list[i].weather[0].main; // weather short
			obj['id'] = data.list[i].weather[0].id; // weather id
			obj['temp'] = data.list[i].main.temp; // avg. tempature
			obj['humid'] = data.list[i].main.humidity; // humidity
			obj['windDeg'] = data.list[i].wind.deg; // wind direction in degreese
			obj['windSpeed'] = data.list[i].wind.speed; // wind speed in meter/sec
			obj['cloudsPer'] = data.list[i].clouds.all; // Percent of clouds in the sky
			
			weatherArr.push(obj);
		}
		return weatherArr;
	}

	store.set('tinderboxWeather', handleWeather(data));
}

function map(shiftLocation) {
	var shiftLocation = shiftLocation;
	var overlay;
      USGSOverlay.prototype = new google.maps.OverlayView();

      // Initialize the map and the custom overlay.

      function initMap(shiftLocation) {
        var map = new google.maps.Map(document.getElementById('app'), {
          zoom: 15,
          center: {lat: 55.380, lng: 10.342652},
          mapTypeId: 'satellite'
        });

        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(55.3769012, 10.333567),
            new google.maps.LatLng(55.384621, 10.3473));
			
        // The photograph is courtesy of the U.S. Geological Survey.
        var srcImage = RESS + 'img/barmap.svg';

		var marker = new google.maps.Marker({
          position: shiftLocation,
          map: map,
          title: 'Be here!?!'
        });

        // The custom USGSOverlay object contains the USGS image,
        // the bounds of the image, and a reference to the map.
        overlay = new USGSOverlay(bounds, srcImage, map);
      }

      /** @constructor */
      function USGSOverlay(bounds, image, map) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;

        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
      }

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      USGSOverlay.prototype.onAdd = function() {

        var div = document.createElement('div');
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';

        // Create the img element and attach it to the div.
        var img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        div.appendChild(img);

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      };

      USGSOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
    	var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };
	//   initMap(shiftLocation);
      google.maps.event.addDomListener(window, 'load', initMap(shiftLocation));
	  jQuery("#app").prepend(backNav("Map"));

};

function chat() {
	var html =
		'<div class="chat-container row">'
			+'<div class="col s12">'
				+'<img src="'+ RESS +'img/chatbox.png">'
			+'</div>'
		+'</div>';
	var sendHtml = backNav('Chat') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
}

function information() {

	var html =
			'<div class="row faq-container">'
				+'<div class="col s12">'
					+'<ul class="collapsible" data-collapsible="accordion">'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>TO BE A VOLUNTEER</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>• You are a part of a team and a community of 5000 people.'
								+'<br>'
								+'• You are a part of getting the wheels to go around.'
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
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>RULES OF ENGAGEMENT</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>• By signing up you agreed of our rules of engagement.'
			      				+'<br>'
			      				+'• If you forgot them or just want to read them again, they are available here: '
			      				+'<a href="www.tinderbox.dk/en/volunteers/rules-of-engagement/">Rules of engagement</a> </p>'
			      			+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>DEADLINE FOR DEREGISTRATION</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>By the 1st of June 2016, you cannot opt out without getting in contact with your team leader. '
		      					+'Read more in our FAQ.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>SHIFTS</div>'
		      				+'<div class="collapsible-body">'
			      				+'<p>• You may never be absent for a shift without being in contact with your team leader.'
			      				+'<br>'
			      				+'• In case of acute illness or unexpected events or otherwise you must notify your team leader as soon as possible.'
			      				+'<br>'
			      				+'• You will find the contact information for your team leader in RUBY by clicking on “MY TEAMS”.'
			      				+'<br>'
			      				+'• Tinderbox may in specific cases require showing of a medical report. You are responsible for obtaining a medical report and ' 
			      				+'have to cover the expenses if there are any.</p>'
		      				+'</div>'
						+'</li>'
						+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>ALCOHOL POLICY</div>'
		      				+'<div class="collapsible-body">'
			      				+'<p>• You may not be influenced by alcohol on your shift!'
			      				+'<br>'
			      				+'• You may not drink alcohol on your shift!</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>VALUABLES</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>• Valuables brought to Tinderbox are at your own risk, and our insurance does not cover damages or loss.'
								+'<br>'
								+'• Read more here: <a href="www.tinderbox.dk/en/info/">info</a></p>'
							+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>CLOTHING</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>• The provided t-shirt must be worn when on duty. It should not be worn when you are off.'
		      					+'<br>'
		      					+'• Always make sure to bring practical clothing and footwear.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>MEALS FOR VOLUNTEERS</div>'
			      			+'<div class="collapsible-body">'
			      				+'<p>• All volunteers can get sandwiches during their shifts.'
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
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>VOLUNTEER LOUNGE</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>• At Tinderbox there is an area exclusively for volunteers. In the Lounge you will find:'
		      					+'<br>'
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
		      					+'NOTICE! Volunteer Lounge has a new location – orient yourselfon the map in this guide.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>WARDROBE</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>In the Volunteer Lounge there is a wardrobe only for volunteers. Here you can store coats and small bags.'
								+'Storage is at your own risk and wardrobes are not supervised outside opening hours.'
								+'The price of the cloakroom is 10 kroner per day.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>ROSTERS</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Your roster will be released during May. You can find it by logging on to RUBY and selecting “MY SHIFTS”</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>CHECK–IN</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>• NOTICE! New location. This year the Check-In for volunteers is placed in connection with the main entrance,'
								+' which is located by Falen. Orientate yourself in this guide.'
								+'<br>'
								+'• Before you can get onto the site, you have to go through our Check-In, where you must be wearing the wristband '
								+'that gives you access to the festival site.'
								+'<br>'
								+'• To check-in, you have to bring your ticket and picture-ID!'
								+'<br>'
								+'• You will find your ticket by logging on to RUBY and selecting ”MY TICKET”.'
								+'<br>'
								+'• You can bring your ticket on smartphone or tablet.'
								+'<br>'
								+'• Check-In is open during the construction days, during and after Tinderbox - see opening hours below.'
								+'<br>'
								+'• If you have a shift before Check-In opens, you will arrange a meeting point with your team leader, and he/she will '
								+'make sure that you get a temporary wristband.'
								+'<br>'
								+'• AVOID QUEUES!!! Get your bracelet on before Tinderbox. That way you will avoid possible queues at the Check-In in '
								+'the busy periods.'
								+'<br>'
								+'OPENING HOURS:'
								+'<br>'
								+'• June 19 – 21: 08.00 – 20.00'
								+'<br>'
								+'• June 22:      07.00 – 20.00'
								+'<br>'
								+'• June 23:      07.00 – 24.00'
								+'<br>'
								+'• June 24:      08.00 – 24.00'
								+'<br>'
								+'• June 25:      08.00 – 20.00'
								+'<br>'
								+'• June 26:      09.00 – 12.00'
								+'<br>'
								+'ADDRESS: Tusindårsskoven, Falen, 5200 Odense V '
								+'(By the main entrance)</p>'
		      				+'</div>'
			    		+'</li>' 
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>HYGIENE</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Hygiene is a very important factor on Tinderbox. Everyone - especially volunteers who work with food MUST be extremely '
								+'aware of general and personal hygiene. Everyone, no matter where they work and what function they have, MUST know these rules:'
								+'<br>'
								+'• Wash your hands as often as possible - and then again.'
								+'<br>'
								+'• Do you have wounds, cuts, diarrhea, a runny nose or similar talk to your team leader.'
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
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>SAFETY</div>'
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
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>CONTACT INFORMATION</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Tinderbox is held in Tusindårsskoven, Falen, 5200 Odense <V></V>'
								+'<br>'
								+'Volunteer: <a href="mailto:frivillig@tinderbox.dk">frivillig@tinderbox.dk</a>'
								+'<br>'
								+'RUBY support: <a href="mailto:techsupport@tinderbox.dk">techsupport@tinderbox.dk</a>'
								+'<br>'
								+'RUBY: <a href="ruby.tinderbox.dk">ruby.tinderbox.dk</a>'
								+'<br>'
								+'Facebook: <a href="www.facebook.com/tinderboxers/">Tinderbox Facebook</a>'
								+'<br>'
								+'Accommodation: <a href="www.tinderbox.dk/overnatning/">www.tinderbox.dk/overnatning/</a>'
								+'<br>'
								+'Accommodation (Facebook): <a href="www.facebook.com/events/508759709291144/">www.facebook.com/events/508759709291144/</a> </p>'
		      				+'</div>'
			    		+'</li>'
			    	+'</ul>'
			    +'</div>'
			+'</div>';
	var sendHtml = backNav('Information') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
	 jQuery('.collapsible').collapsible({
		onOpen: function(el) { 

			el[0].firstChild.style.color = "rgb(255, 217, 98)";
			el[0].childNodes[0].firstChild.className = "material-icons ani-down";
		
		},
		onClose: function(el) {
			el[0].firstChild.style.color = "white";
			el[0].childNodes[0].firstChild.className = "material-icons ani-back";
		}
	});
}

function faq() {
	var html =
			'<div class="row faq-container">'
				+'<div class="col s12">'
					+'<ul class="collapsible" data-collapsible="accordion">'
						+'<h2>VOLUNTEER/GOOD TO KNOW</h2>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i><span>PERIODS OF EFFORT</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>A period of effort is the period of time you can/will help Tinderbox. You can choose between 3 different periods, and you have to at least choose one of them. You can also select multiple periods, and thus increase your chances of getting on a team.'
		      					+'<br>'
		      					+'<br>'
		      					+'<strong>NOTICE</strong>: Some before/after teams operate with one shift before AND one shift after. You will be notified about which team/teams this concern, prior to your selection.'
		      					+'<br>'
		      					+'<br>'
		      					+'<b>Periods of effort:</b>'
		      					+'<br>'
		      					+'<b>Before</b> Tinderbox'
		      					+'<br>'
		      					+'<b>During</b> Tinderbox'
		      					+'<br>'
								+'<b>After</b> Tinderbox</p>'
							+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>HOURS OF EFFORT & DISTRIBUTION</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Hours of effort are the number of hours you are helping Tinderbox.'
			      				+'<br>'
			      				+'<b>Before</b> Tinderbox = around 24 hours'
			      				+'<br>'
			      				+'<b>During</b> Tinderbox = around 16 hours'
			      				+'<br>'
			      				+'<b>After</b> Tinderbox = around 24 hours'
			      				+'<br>'
			      				+'<br>'
			      				+'The distribution of your hours of effort are determined by your volunteer coordinator/team leader. Expect that your hours of effort will be spread out over more than one coherent shift, unless otherwise agreed with your volunteer coordinator/team leader.</p>'
			      			+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>SHIFT SWAP</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>If you need to swap a shift with one of the others on your team, click on ”Shift Swap”. Contact your volunteer coordinator/team leader for questions regarding swapping your shift(s).</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>SHIFT SCHEDULE</div>'
		      				+'<div class="collapsible-body">'
			      				+'<p>Your shift schedule will be made by your volunteer coordinator/team leader and placed i RUBY under your profile. We strive to have the schedules finished around mid-May.'
			      				+'<br>'
			      				+'<br>'
			      				+'<b>NB! You have to approve your shift schedule in RUBY, so we know that you seen it. Until you do so, we reserve the right to unregister and blacklist you.</b></p>'
		      				+'</div>'
						+'</li>'
						+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>INSURANCE</div>'
		      				+'<div class="collapsible-body">'
			      				+'<p>All volunteers at Tinderbox are insured via the statutory workers’ compensation insurance. This covers bodily injury – but not personal things. For example, if you were to take your computer with you to Tinderbox, it is your responsibility. In addition, there is a liability insurance for organizers. This covers damage to a third party caused by the employee during the hours of effort. All damages are to be reported to your volunteer coordinator/team leader immediately.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>AUDIO & FOOTAGE</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>It is not allowed to bring tape recorders, camcorders, SLR cameras and professional photographic equipment. Video recordings are not allowed. However, you may bring small digital camcorders (pocket size) and mobile phones on site without prior authorization. It is forbidden to take pictures of the artists, ask for an autograph or otherwise contact them. It is important that we all respect the artist’s privacy.</p>'
							+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>CHECK-IN & WRISTBANDS</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Check-In for volunteers at Tinderbox is situated close to the main entrance at Falen. Follow the signs.'
		      					+'<br>'
		      					+'<br>'
		      					+'We will release your voucher which is your entry ticket to Tinderbox, in early June. You’ll find it for download under your profile in RUBY. On your voucher/ticket you will also find a map showing where Falen and volunteer check-in is situated.'
		      					+'<br>'
		      					+'<br>'
		      					+'<b>NB</b>: Always show up for your shift in due time – at least 15 min. before your shift starts. Your wristband gives you access to the festival site throughout the whole festival.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>LOST & FOUND</div>'
			      			+'<div class="collapsible-body">'
			      				+'<p>If you lost something at Tinderbox, and it has been handed in, we will make every effort to take good care of it. Everything must be handed in/will be handed in to the <b>Office of Organization</b>, located in what we call the “production city” in Tusindårsskoven.'
			      				+'<br>'
			      				+'<br>'
			      				+'Here you can collect your things until Wednesday June 29th until around 5 p.m. After June 29th everything will be moved to our headquarters, which you can contact by writing an e-mail to <a href="mailto:info@tinderbox.dk">info@tinderbox.dk.</a>'
			      				+'<br>'
			      				+'<br>'
			      				+'• During volunteers will have access to 2 sandwiches.'
			      				+'<br>'
			      				+'<br>'
			      				+'Describe in detail what you are missing, and we will look for it and get back to you.'
			      				+'<br>'
			      				+'• Volunteers are allowed to bring food, fruit and snacks.'
			      				+'<br>'
			      				+'<br>'
			      				+'We keep lost property until July 6th after which everything of value (purses, mobiles, keys, cash, jewelry, handbags and the like) will be given to <a href="https://www.politi.dk/Fyn/da/Borgerservice/Hittegods/">Fyns Politis Hittegodskontor.</a> All clothing and the like will be donated to non-profit or charitable purposes after July 6th.</p>'
			      			+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>FOOD & DRINKS</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>It is not allowed to bring your own drinks. This goes for both drinks with and without alcohol. Read more in our <a href="http://www.tinderbox.dk/en/praktisk/volunteers/rules-of-engagement/">Rules of Engagement.</a>'
		      					+'<br>'
		      					+'<br>'
		      					+'As a Volunteer at Tinderbox you will receive meals in connection with your shifts. However, this does not include breakfast, as it is expected that you eat before going to the festival site. If the food provided does now cover your needs, you are welcome to also bring food/snacks for your shifts. No matter what time of day your shifts are, we encourage you to eat before heading to the festival site. You never know when your first meal break will be.'
		      					+'<br>'
		      					+'<br>'
		      					+'There will always be free water, coffee and tea in connection with the shifts you have at Tinderbox.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>ACCOMMODATION</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Unfortunately Tinderbox does not provide accommodation. If you need accommodation you must book/arrange it yourself.'
		      					+'<br>'
		      					+'<br>'
								+'We have created a group on Facebook specifically for volunters at Tinderbox, where you have the opportunity to help each other with either a sofa, a floor or the like. Find it <a href="http://www.tinderbox.dk/en/praktisk/frivillig/faq-2/%20https://www.facebook.com/events/508759709291144/">here</a>.'
								+'<br>'
								+'<br>'
								+'Help each other out – it’s good karma.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>PARKING CARS/BIKES</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Your bike is very welcome, but we don’t have space for your car. We encourage everyone to use public transport, walk or cycle. If you decide to take the car anyway, you can find more information about parking facilities in and around Odense <a href="http://www.tinderbox.dk/en/info/">here.</a>'
		      					+'<br>'
		      					+'<br>'
		      					+'There will be bike parking at Falen, which is situated close to the main entrance. The bike parking will be staffed while Tinderbox is open:'
		      					+'<br>'
		      					+'<br>'
		      					+'Thursday June 23rd from 13:00 PM to 02:30 AM.'
		      					+'<br>'
		      					+'<br>'
		      					+'Friday June 24th from 12:00 PM to 02:30 AM.'
		      					+'<br>'
		      					+'<br>'
		      					+'Saturday June 25th from 12:00 PM to 02:00 AM.'
		      					+'<br>'
		      					+'<br>'
		      					+'Parking is at your own risk. It is not allowed to park bicycles elsewhere on or around the Tinderbox site. Therefore, it is important that you park your bike before you go get your wristband or before you head in for your shifts on the festival site.'
		      					+'<br>'
		      					+'<br>'
		      					+'In the build-up period and the packing period it will be possible to park your bike at <b>Check-In at Falen close to the main entrance.</b></p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>RULES OF ENGAGEMENT</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Please read our <a href="http://www.tinderbox.dk/en/rules-of-engagement/">Rules of Engagement</a>'
								+'<br>'
								+'<br>'
								+'It is very important, that you know what you can expect from us, and what we expect of you.</p>'
		      				+'</div>'
			    		+'</li>' 
			    		+'<h2>VOLUNTEER / REGISTRATION AND CANCELLATION</h2>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>CANCELLATION AND ILLNESS</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Please read our <a href="http://www.tinderbox.dk/en/rules-of-engagement/">Rules of Engagement.</a>'
								+'<br>'
								+'<br>'
								+'It is very important to us that you know what you can expect from us and what we expect of you.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i><span>DEADLINE OF CANCELLATION / MANDATORY REGISTRATION</span></div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>All registrations are binding after June 1st 2016. Then apply our <a href="http://www.tinderbox.dk/en/rules-of-engagement/">Rules of Engagement</a> in order for late cancellation.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>POLICY OF AGE</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>You must be at least 18 years before June 1st 2016. This is a requirement from our insurance and can not be bent in any way.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>HELP, I CAN’T LOG IN!</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Make a detailed description of how you experience the error. Send the description and your username/email address to <a href="mailto:techsupport@tinderbox.dk">techsupport@tinderbox.dk</a> and our technical support will help you with the problem as soon as possible.'
		      					+'<br>'
		      					+'<br>'
		      					+'If it’s because you forgot your password, click “forgot your password?” and create a new one.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>WHO’S RUBY?</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p><b>RUBY is the name of our employee system.</b>'
		      					+'<br>'
		      					+'<br>'
		      					+'This is the system where you log in, you see your team and get information that only the volunteers can see and much more. She is right <a href="http://ruby.tinderbox.dk/">here.</a>'
		      					+'<br>'
		      					+'<br>'
		      					+'We update her all the time, so if you have any inputs to practical and effective features that you need as a volunteer, please write to us.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>CHOOSING A TEAM</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p><b>A team</b>'
		      					+'<br>'
		      					+'<br>'
		      					+'A small group with an already defined task.'
		      					+'<br>'
		      					+'<br>'
		      					+'<b>If your desired area of effort/team does not appear on the list of your choices during the enrollment, it may be because:</b>'
		      					+'<br>'
		      					+'<br>'
		      					+'1: The period of effort the area/team does not match the effort period you’ve chosen.'
		      					+'<br>'
		      					+'<br>'
		      					+'– Try another period of effort.'
		      					+'<br>'
		      					+'<br>'
		      					+'2: The area of effort/team no longer exists at Tinderbox, or has been changed.'
		      					+'<br>'
		      					+'<br>'
		      					+'– Select another area of effort/team.'
		      					+'<br>'
		      					+'<br>'
		      					+'3: The area of effort/team is already filled.'
		      					+'<br>'
		      					+'<br>'
		      					+'– Select another area of effort/team.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>MISSING CONFIRMATION MAIL?</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Before your registration is accepted be RUBY, you have to confirm your email. Immediately after your registration you will receive an email with a link you must click on. This will allow you to finish your registration.'
		      					+'<br>'
		      					+'<br>'
		      					+'If you do not receive this email, perhaps it landed in your spam folder. If not, you can write to our technical support: <a href="mailto:techsupport@tinderbox.dk">techsupport@tinderbox.dk</a></p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i><span>SIGN-UP AS A VOLUNTEER AT TINDERBOX</span></div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Your sign up as a volunteer <a href="http://ruby.tinderbox.dk/">here</a> from March 15th at 10:00 AM. We reserve the right to screen all the entries we receive.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>GUARANTEE OF SPOT</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>In your sign-up, if you are able to choose a work area/a team where are still spots available, you are guaranteed a spot as a volunteer at Tinderbox 2016, unless there is a breach of our <a href="http://www.tinderbox.dk/en/rules-of-engagement/">Rules of Engagement</a> at a later time.'
		      					+'<br>'
		      					+'<br>'
		      					+'If you only had the chance to join our waiting list, you are not guaranteed a spot as a volunteer at Tinderbox 2016 until you hear from us.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>TECHNICAL ERROR</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>Do you have a suspicion that there was a technical error, or are you experiencing mood swings from RUBY?'
		      					+'<br>'
		      					+'<br>'
		      					+'Write an email with a detailed description of what you see and send it to our support: <a href="mailto:techsupport@tinderbox.dk">mailto:techsupport@tinderbox.dk</a></p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>SHIFTS WITH A FRIEND</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>You have the opportunity to note the name of one of your friends you want to work with during your registration.'
		      					+'<br>'
		      					+'<br>'
		      					+'Another possibility is that you and your friends coordinate your registration and choose the same actions.'
		      					+'<br>'
		      					+'<br>'
		      					+'We can not guarantee that all volunteers at Tinderbox will have all their wishes fulfilled. Please respect that we are working with a very large puzzle – we do the best we can.</p>'
		      				+'</div>'
			    		+'</li>'
			    		+'<li>'
			      			+'<div class="collapsible-header"><i class="material-icons">play_arrow</i>WAITING LIST</div>'
		      				+'<div class="collapsible-body">'
		      					+'<p>If all our teams are filled up, you have the option of joining our waiting list. This is general and is considered as one large pool.'
		      					+'<br>'
		      					+'<br>'
		      					+'You are not guaranteed a spot as a a volunteer at Tinerbox by being on our waiting list, and you are not able to have any influence on which team you want to be a part of. We select and allocate seats from the established requirements combined with your choice of periods of effort. This means that we do not select through “first in, first seated” and the more periods of effort you choose, the more opportunities there is for us to choose you.'
		      					+'<br>'
		      					+'<br>'
		      					+'If we put you on a team, you will receive an e-mail. Then you can login here and see which team we have located for you, as well as a contact to your volunteer coordinator/team leader.</p>'
		      				+'</div>'
			    		+'</li>'
			    	+'</ul>'
			    +'</div>'
			+'</div>';
	var sendHtml = backNav('FAQ') + html;
	jQuery('#app').html(sendHtml); //overwrites the content from the view
	jQuery('.collapsible').collapsible({
		onOpen: function(el) { 

			el[0].firstChild.style.color = "rgb(255, 217, 98)";
			el[0].childNodes[0].firstChild.className = "material-icons ani-down";
		
		},
		onClose: function(el) {
			el[0].firstChild.style.color = "white";
			el[0].childNodes[0].firstChild.className = "material-icons ani-back";
		}
	});


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

function degToCompass(num) {
	// returns where the wind is coming from, depending on the wind direction in degrees
	var val = Math.floor((num / 22.5) + 0.5);
	var arr = ["south", "south-southwest", "southwest", "west-southwest", "west", "west-northwest", "northwest", "nort-northwest", "north", "north-northeast", "northeast", "east-northeast", "east", "east-southeast", "southeast",  "south-southeast"];
	return arr[(val % 16)];
}
// var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	// return arr[(val % 16)];

function windToText(num) {
	// https://en.wikipedia.org/wiki/Beaufort_scale
	switch (true) {
		case (num < 1.6):
			return "Calm";
		case (num < 3.3):
			return "Light breeze";
		case (num < 5.5):
			return "Gentle breeze";
		case (num < 7.9):
			return "Moderate breeze";
		case (num < 10.7):
			return "Fresh breeze";
		case (num < 13.8):
			return "Strong breeze";
		case (num < 17.1):
			return "High wind";
		case (num < 20.7):
			return "Gale";
		case (num < 24.4):
			return "Severe gale";
		case (num < 28.4):
			return "Storm";
		case (num < 32.6):
			return "Violent storm";
		case (num >= 32.6):
			return "Hurricane";
	}
}

function idToIcon(id) {
	switch (true) {
		case (id >= 200 && id < 300):
			return "<img src=" + RESS + "img/lightingBack.svg>"; 
		case (id >= 300 && id < 322):
			return "<img src=" + RESS + "img/drizzleBack.svg>"; 
		case (id >= 500 && id < 600):
			return "<img src=" + RESS + "img/rainy-dayBack.svg>"; 
		case (id >= 600 && id < 700):
			return "<img src=" + RESS + "img/snowBack.svg>"; 
		case (id == 800):
			return "<img src=" + RESS + "img/sunny-dayBack.svg>"; 
		case (id > 800 && id < 805):
			return "<img src=" + RESS + "img/overcast-dayBack.svg>"; 
	}
}

function insertWeather() {
	var tw = store.get('tinderboxWeather');
	var weather = '<div>';
	var i;
	for(i = 0; i < 5; i++) {
		weather += 
		'<div class="weather-block">'
			+'<div class="tbw-img tbw">'+ idToIcon(tw[i].id) +'</div>'
			+'<div class="tbw-temp tbw">' + Math.round(tw[i].temp) + '&#176;C</div>' // no floating point
			+'<div class="tbw-date tbw">' + tw[i].date.substring(11, 16) + '</div>' // only show the hour
			+'<div class="tbw-weather tbw">' + tw[i].weather + '</div>'
			+'<div class="tbw-desc tbw">' + tw[i].weatherDesc + '</div>'
			+'<div class="tbw-speed tbw">' + tw[i].windSpeed + ' m/s</div>' // needs to be converted to clear text
			+'<div class="tbw-wtext tbw">' + windToText(tw[i].windSpeed) + '</div>' // needs to be converted to clear text
		+'</div>';
	}
	weather += '</div>';
	jQuery('#weather-container').html(weather);
}


/* =======  End of Custom Functions  ======= */


/**================================================== *
 * ==========  Buttons  ========== *
 * ================================================== */
jQuery('#app').on('click', '.btn-login-submit', login);
jQuery('#app').on('click', '.btn-shift-map', function(e) {
	var arrLocation = jQuery(this).data("location").split(' ');
	var floatLat = parseFloat(arrLocation[0]);
	var floatLng = parseFloat(arrLocation[1]);
	shiftLocation = {
		lat: floatLat,
		lng: floatLng
	};
	map(shiftLocation);
});
jQuery('#app').on('click', '.btn-map', map);
jQuery('#app').on('click', '.btn-chat', chat);
jQuery('#app').on('click', '.btn-info', information);
jQuery('#app').on('click', '.btn-faq', faq);
jQuery('#app').on('click', '.btn-back', mainMenu);
//jQuery('#app').on('click', '.btn-notification', {title: "notification"}, notification);
//jQuery('#app').on('click', '.btn-settings', settings);
jQuery('#app').on('click', '.btn-logout', loginScreen);

/* =======  End of Buttons  ======= */



/**================================================== *
 * ==========  Further Development  ========== *
 * ================================================== *
 * 
 * changeImage()
 * settings()
 * notifications()
 * chat module
 * Use a view framework, like VueJS, ReactJS, Handlebars etc
 *  
/* =======  End of Further Development  ======= */
