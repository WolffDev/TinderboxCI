jQuery(function() {
	// topNav(1);
	mainMenu();
});

const URL = 'http://localhost:8888/tissekone/';

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
			console.log(status);
			console.log(data);
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
		url: URL + 'api/users',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			console.log(status);
			console.log(data);
		var html = '<h1>topNav</h1>';

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})
};


/*=====  End of Topnavigation  ======*/


/*=============================================
=            Mainmenu                        =
=============================================*/

function mainMenu() {
	jQuery.ajax({
		url: URL + 'api/shifts/1', //load token
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			console.log(status);
			console.log(data);
		var html = '<h1>Mainmenu</h1>';

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})
};


function map() {
	jQuery.ajax({
		url: URL + 'api/shifts',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			console.log(status);
			console.log(data);
		var html = '<h1>map</h1>';

			jQuery('#container').html(html); //overwrites the content from the view

		}
	})
};

function chat() {
	jQuery.ajax({
		url: URL + 'api/shifts',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			console.log(status);
			console.log(data);
		var html = '<h1>chat</h1>';

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})
}

function information() {
	jQuery.ajax({
		url: URL + 'api/information',
		contentType: 'application/json',
		success: function()
		{
		
		var html = '<h1>info</h1>';

			jQuery('#container').html(html); //overwrites the content from the view
		}
	})

}

function faq() {
	jQuery.ajax({
		url: URL + 'api/faq',
		contentType: 'application/json',
		success: function()
		{

		var html = '<h1>FAQ</h1>';

			jQuery('#container').html(html); //overwrites the content from the view
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
		success: function(data, status, response)
		{
			console.log(status);
			console.log(data);
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
			console.log(status);
			console.log(data);
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
			console.log(status);
			console.log(data);
		var html = '<h1>notification</h1>';

			jQuery('#container').html(html); //overwrites the content from the view

		}
	})
};


/*=====  End of Burgermenu  ======*/



