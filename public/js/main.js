jQuery(function() {
	// topNav(1);
	mainMenu();
});

const URL = 'http://webtinderbox:8888/';

/*=============================
=            Login            =
=============================*/

function login() {
	jQuery.ajax({
		url: URL + 'api/users',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			var html = '<h1>Log-in</h1>';

			jQuery('#container').html(html); //overwrites the content from the view

		}
	})
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
		success: function(data, status, response)
		{
			var html = '<h1>topNav</h1>'
					+ '<button class="waves-effect waves-light btn btn-back">back</button>';

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})
};

/*
 * Buttons
 */

 jQuery('#container').on('click', '.btn-back', mainMenu);

/*=====  End of Topnavigation  ======*/


/*=============================================
=            Mainmenu                        =
=============================================*/

function mainMenu() {
	jQuery.ajax({
		url: URL + 'api/shifts/44', //load token
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			var html = '<h1>Mainmenu</h1>'
					+ '<button class="waves-effect waves-light btn btn-map">Map</button>'
					+ '<button class="waves-effect waves-light btn btn-chat">Chat</button>'
					+ '<button class="waves-effect waves-light btn btn-info">Info</button>'
					+ '<button class="waves-effect waves-light btn btn-faq">FAQ</button>';

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})
};


function map() {
	jQuery.ajax({
		url: URL + 'api/shifts/44',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			var html = topNav();

			jQuery('#container').html(html); //overwrites the content from the view

		}
	})
};

function chat() {
	jQuery.ajax({
		url: URL + 'api/shifts/44',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			var html = topNav();

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})
}

function information() {
	jQuery.ajax({
		contentType: 'application/json',
		success: function()
		{
			var html = topNav();

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})

}

function faq() {
	jQuery.ajax({
		contentType: 'application/json',
		success: function()
		{

			var html = topNav();
			html += '<h1>TEST</h1>';

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})

}

/*
 * Buttons
 */

 jQuery('#container').on('click', '.btn-map', map);
 jQuery('#container').on('click', '.btn-chat', chat);
 jQuery('#container').on('click', '.btn-info', information);
 jQuery('#container').on('click', '.btn-faq', faq);

/*=====  End of Mainmenu  ======*/

/*==================================
=            Burgermenu            =
==================================*/
function changeImage() {
	jQuery.ajax({
		url: URL + 'api/users',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			var html = '<h1>changeImage</h1>';

			jQuery('#container').html(html); //overwrites the content from the view

		}
	})
};

function settings() {
	jQuery.ajax({
		url: URL + 'api/settings',
		contentType: 'application/json',
		type: 'PUT',
		success: function(data, status, response)
		{
			var html = '<h1>Settings</h1>';

			jQuery('#container').html(html); //overwrites the content from the view

		}
	})
};

function notification() {
	jQuery.ajax({
		url: URL + 'api/notification',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			var html = '<h1>notification</h1>';

			jQuery('#container').html(html); //overwrites the content from the view

		}
	})
};


/*=====  End of Burgermenu  ======*/



