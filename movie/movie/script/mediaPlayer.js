(function() {
	var ext,
		audioSource,
		targetSrc,
		myPlayer = document.querySelector("#myAudioPlayer"),
		genreTitle = document.querySelector("#genreTitle"),
		arrayIndex = 0,
		arrayName = null,
		volControlRemoved = false,
		genreButtons = document.querySelectorAll('#buttonHolder img'),
		dropTarget = document.querySelector('#theTarget'),
		nextTrack = null,
		button = document.querySelector("#submit"),
		id;
		

	function drag(e) {
		//grab the id of the dragged item and store it in dataTransfer as storedId
		var theData = e.dataTransfer.setData("storedId", e.target.id);

		targetSrc = e.target.src;
	}
	
	function allowDrop(e){
		//allow drop to happen (by default you can't drop elements on top of each other)
		e.preventDefault();
	}
	
	// do an ajax call on the drop and build stuff in a .done function
	function drop(e) {
		e.preventDefault();
		console.log("dropped!");

		var draggedData = e.dataTransfer.getData("storedId");

		e.target.src = targetSrc;
		console.log("Genre: " + draggedData);
		$.ajax({
			url: 'includes/ajaxQuery.php',
			type: 'GET',
			data: { genre: draggedData },
		})
		
		.done(function(data) {
			if (data && data !=="null") {
				data = JSON.parse(data);
				buildMovies(data);
				retrieveComments(data[0].id);
			} else {
				console.log('didn\'t work, show error or try again message');
			}			
		})

		.fail(function(ajaxCall, stats, error) {
			console.log("error");
			console.dir(ajaxCall);
		});
	}

	// ajax call should build this
	function buildMovies(movielist) {
		var currentElement;
		genreTitle.innerHTML = movielist[0].genre;
		var loadedMovies = document.querySelector(".trackHolder");
		loadedMovies.innerHTML = '';
		[].forEach.call(movielist, function(movie, index) {
			
			var newMovie = document.createElement('li'),
				movieLabel = document.createElement('h4'),
				movieDesc = document.createElement('p');
	
			newMovie.dataset.movieref = movie.id;
			newMovie.dataset.trailer = movie.trailer;
			
			movieLabel.innerHTML = movie.name;
			movieDesc.innerHTML = movie.description;
			
			// add the pieces to the containing list element
			newMovie.appendChild(movieLabel);
			newMovie.appendChild(movieDesc);
			loadedMovies.appendChild(newMovie);
		});
		
		// add event handling to new track elements
		$('.trackHolder li').on('click', function() {
			var description = $(this).find('p').text(),
			movieSynopsis = document.querySelector(".synopsis");
			var mid = document.querySelector("#movId");
			mid.innerHTML = this.dataset.movieref;
			id = this.dataset.movieref;
			movieSynopsis.innerHTML = description;
			retrieveComments(this.dataset.movieref);
			var trailer = document.querySelector("#video");
			trailer.src = "video/" + this.dataset.trailer + ".mp4";
		});

		$('.trackHolder li').first().trigger('click');
	}

	function retrieveComments(data) {
		$.ajax({
			url: 'includes/ajaxQueryComments.php',
			type: 'GET',
			dataType: 'json',
			data: { movie: data },
		})

		.done(function(data) {
			console.log("success! ", data);
			if (data && data !== null) {
				[].forEach.call(data, function(comment){
				var commentP = document.querySelector(".comment");
				commentP.innerHTML = comment.comments;
				console.log("Comments = " + comment.comments);
				});
			}
		})

		.fail(function(xhr, error) {
			console.log(xhr, "error: ", error);
		});
	}
	
	function submitComment()
	{
		var commentInput = document.querySelector("#commentInput");
		var commentText = commentInput.value;
		var movieID = document.querySelector("#movId");
		var movID = movieID.value;
		$.ajax({
			url: 'includes/ajaxQueryComments.php',
			type: 'POST',
			dataType: 'json',
			data: { movieID: '1', comment: commentText }
		})
	}
	
	theTarget.addEventListener('drop', drop, false);
	theTarget.addEventListener('dragover', allowDrop, false);
	
	[].forEach.call(genreButtons, function(button) {
	button.addEventListener('dragstart', drag, false);
	});
	button.addEventListener('click', submitComment, false);
})();