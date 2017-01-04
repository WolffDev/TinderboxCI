jQuery(function()
{
	loadNotes();
});

function loadNotes()
{
	jQuery.ajax({
		url: 'http://localhost:8888/notes/note',
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{
			console.log(status);
			console.log(data);

			var list = '';
			for(var i in data)
			{
				//<a href="#!" class="collection-item">Alvin</a>
				list += '<a href="' + data[i].id + '" class="note collection-item">' + data[i].title + '</a><a href="#"><i class="material-icons right">delete_forever</i></a><a href="#"><i class="material-icons right">mode_edit</i></a>';
			}

			var html = '<div class="row">'
							+'<div class="col s6">' 
								+'<div class="collection">'
									+ list
								+'</div>'
							+'</div>'
						+'<div class="col s6">'
							+'<h1>Tilføj note</h1>'
							+'<br>'
							+'<br>'
							+ '<form>'
								+'Title: <input type="text" name="title"><br>'
								+'Content: <input type="text" name="content"><br>'
								+'<input type="submit" class="waves-effect waves-light btn btn-add" value="Add">'
							+'</form>'
						+'</div>'

						+'</div>';

			jQuery('#container').html(html); //overwrites the content from the view

		}
	});

	jQuery('#container').on('click', '.note', function(e)
	{
		e.preventDefault();
		var link = jQuery(this).attr('href');
		console.log(link);
		single(link);
	});
};


function createNote(e)
{
	e.preventDefault();
	var titleVal = $('input[name="title"]').val();
	var contentVal = $('input[name="content"]').val();

	var sendInfo = {
           "title": titleVal,
           "content": contentVal
       };

	jQuery.ajax({
		url: 'http://localhost:8888/notes/note/add/',
		contentType: 'application/json',
		type: 'POST',
		data: JSON.stringify(sendInfo),
		success: function(data, status, response)
		{
			loadNotes();
		}
	});

}


function single(link)
{
	jQuery.ajax({
		url: 'http://localhost:8888/notes/note/single/' + link,
		contentType: 'application/json',
		type: 'GET',
		success: function(data, status, response)
		{	
			console.log(status);
			console.log(data.response.content);

			var html = '<div class="waves-effect waves-light btn btn-back">Tilbage</div>'
					+ '<h1>' + data.response.title + '</h1>' 
					+ '<p>' + data.response.datetime + '</p>'
					+ '<p>' + data.response.content + '</p>'
					+ '<div class="waves-effect waves-light btn btn-edit">Edit</div>'
					+ '<div class="waves-effect waves-light btn btn-delete">Delete</div>';
			jQuery('#container').html(html); 
		}		
	});
};


function editNote(e)
{
	e.preventDefault();
	var titleVal = $('input[name="title"]').val();
	var contentVal = $('input[name="content"]').val();

	var sendInfo = {
           "title": titleVal,
           "content": contentVal
       };

	jQuery.ajax({
		url: 'http://localhost:8888/notes/note/edit/',
		contentType: 'application/json',
		type: 'POST',
		data: JSON.stringify(sendInfo),
		success: function(data, status, response)
		{
			loadNotes();
		}
	});
}

function deleteNote()
{
	console.log("Slet for satan!")
}
				
/*
 * Buttons
 */
jQuery('#container').on('click', '.btn-back', loadNotes);

jQuery('#container').on('click', '.btn-edit', editNote);

jQuery('#container').on('click', '.btn-delete', deleteNote);

jQuery('#container').on('click', '.btn-add', createNote);


