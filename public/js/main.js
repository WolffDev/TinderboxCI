jQuery(function() {
	// topNav(1);
	mainMenu();
});

const URL = 'http://localhost:8888/tissekone/';


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