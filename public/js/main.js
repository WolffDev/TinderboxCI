jQuery(function() {
	// topNav(1);
	mainMenu();
});

const URL = 'http://localhost:8888/tissekone/';

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
		}
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view
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
		}
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view
	})
};


function map() {
	jQuery.ajax({
		url: URL + 'api/shifts',
		contentType: 'application/json',
		type: 'GET'
		success: function(data, status, response)
		{
			console.log(status)
			console.log(data)
		}
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view

	})
};

function chat() {
	jQuery.ajax({
		url: URL + 'api/shifts',
		contentType: 'application/json',
		type: 'GET'
		success: function(data, status, response)
		{
			console.log(status)
			console.log(data)
		}
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view
	})
}

function information() {
	jQuery.ajax({
		url: URL + 'api/information',
		contentType: 'application/json',
		
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view
	})
}

function faq() {
	jQuery.ajax({
		url: URL + 'api/faq',
		contentType: 'application/json',

		var html = 

			jQuery('#container').html(html); //overwrites the content from the view
		
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
		type: 'GET'
		success: function(data, status, response)
		{
			console.log(status)
			console.log(data)
		}
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view

	})
};

function settings() {
	jQuery.ajax({
		url: URL + 'api/settings',
		contentType: 'application/json',
		type: 'PUT'
		success: function(data, status, response)
		{
			console.log(status)
			console.log(data)
		}
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view

	})
};

function notification() {
	jQuery.ajax({
		url: URL + 'api/notification',
		contentType: 'application/json',
		type: 'GET'
		success: function(data, status, response)
		{
			console.log(status)
			console.log(data)
		}
		var html = 

			jQuery('#container').html(html); //overwrites the content from the view

	})
};


/*=====  End of Burgermenu  ======*/



