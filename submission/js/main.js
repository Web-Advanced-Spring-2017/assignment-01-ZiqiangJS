
var app = app || {};

app.main = (function(){

	console.log('Loading app.');

//-----------------------------------------------------------------
	var attachEvents = function(){

		console.log('Attaching events.');

		$('#search-button').off('click').on('click', function(){
			getTrack($('#search-box').val());
		});

		$('#search-box').keypress(function(e) {
			if (e.keyCode == 13) {
				getTrack($('#search-box').val());
			}
		});

		$("#view").on('click',function(e){
			console.log('click');
			var target = e.target;
			getTrack(target.getAttribute('data-album-id'), function (data){
				audioObject = new Audio(data.tracks.items[0].preview_url);
            	audioObject.play();
			});
		});			
		
	};

//----------------------------------------------------------------
	

//---------------------------------------------------------------
	var getTrack = function(query){

	    $.ajax({
	        url: 'https://api.spotify.com/v1/search',
			data: {
	            q: query,
	            type: 'track',
	            limit: 50,
	            offset: 10
	        },
	        success: function (response) {
			var results = response;
			console.log(results);

			$('#view').empty();

			$('html, body').animate({
             scrollTop: $('#view').offset().top + 'px'
         	}, 'slow');

			for (var i=0; i<50; i++) {
            	$('#view').append('<audio class="player" controls><source src="' + response.tracks.items[0].preview_url + '" type="audio/mpeg"></audio>');
            	$('#view').append('<img src="' + response.tracks.items[i].album.images[2].url + '" />' );
        		}
	        }
	    });

	};

//----------------------------------------------------------------
	// var appendData = function(data){
	// 	console.log('Appending data.');
	// 	console.log(data);

	// 	$('#view').empty();

	// 	$('html, body').animate({
 //            scrollTop: $('#view').offset().top + 'px'
 //        }, 'slow');

	// 	for(var i = 0; i < data.length; i++){
	// 		$('#view').append('<img src="' + data[i].images[2].url + '" class="gallery-item"/>');
	// 	}

	// };

//----------------------------------------------------------------
	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};

	return {
		init: init
	};
})();

window.addEventListener('DOMContentLoaded', app.main.init);
