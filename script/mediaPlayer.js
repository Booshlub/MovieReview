(function() {
	var ext,
		audioSource,
		targetSrc,
		myPlayer = document.querySelector("#myAudioPlayer"),
		genreTitle = document.querySelector("#genreTitle"),
		arrayIndex = 0,
		arrayName = null,
		//timeCounter = document.querySelector('#trackTime'),
		//pBar = document.querySelector('#prog'),
		//togglePlay = document.querySelector("#playButton"),
		//muteTrack = document.querySelector("#muteButton"),
		//shuffleBut = document.querySelector("#shuffle"),
		//volSlider = document.querySelector("#volumeSlider"),
		volControlRemoved = false,
		genreButtons = document.querySelectorAll('#buttonHolder img'),
		dropTarget = document.querySelector('#theTarget'),
		nextTrack = null;

	// initial setup => some default values
	//volSlider.value = 100;

	// get the current audio source
	//audioCurrentSource = myPlayer.currentSrc.toString();
	//ext = audioCurrentSource.substr(audioCurrentSource.lastIndexOf("."));
	// methods

	function drag(e) {
		//grab the id of the dragged item and store it in dataTransfer as storedId
		var theData = e.dataTransfer.setData("storedId", e.target.id);

		targetSrc = e.target.src;
		//console.log(targetSrc);
	}
	
	function allowDrop(e){
		//allow drop to happen (by default you can't drop elements on top of each other)
		e.preventDefault();
	}
	
	// do an ajax call on the drop and build stuff in a .done function
	function drop(e) {
		e.preventDefault();

		var draggedData = e.dataTransfer.getData("storedId");

		e.target.src = targetSrc;

		$.ajax({
			url: 'includes/ajaxQuery.php',
			type: 'GET',
			data: { genre: draggedData },
		})

		.done(function(data) {
			//console.log(data);

			if (data && data !=="null") {
				data = JSON.parse(data);
				buildMovies(data);
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
		console.log("in build, movie list " + movielist[0].description);
		
		var loadedMovies = document.querySelector(".trackHolder");
		
		loadedMovies.innerHTML = '';
		
		[].forEach.call(movielist, function(movie, index) {
			console.log("In for each " + movie.description);
			var newMovie = document.createElement('li'),
			movieLabel = document.createElement('p');
			
			movieLabel.classList.add('trackNameStyle');
			newMovie.dataset.name = movie.name;
			movieLabel.innerHTML = movie.name + ": " + movie.description;
			console.log("Description!");
			
			// add the pieces to the containing list element
			newMovie.appendChild(movieLabel);
			loadedMovies.appendChild(newMovie);
		});
		
		// add event handling to new track elements
		$('.trackHolder li').on('click', function() {
			//currentElement = this;

			var newMovie = this.dataset.movie;
			playTrack(newMovie);

			if (this.nextElementSibling) {
				nextTrack = this.nextElementSibling.dataset.track;
			} else nextTrack = tracklist[0].track_name;
		});
		
		// this should only run if a drop is successful, and only once
		//playTrack(tracklist[0].track_name);
		//getNextTrack(null);
		
		//mock a click
		$('.trackHolder li').first().trigger('click');
	}
	

	theTarget.addEventListener('drop', drop, false);
	theTarget.addEventListener('dragover', allowDrop, false);
	
	togglePlay.addEventListener("click", playToggle, false);
	/*muteTrack.addEventListener("click", trackMute, false);
	shuffleBut.addEventListener("click", shuffleMode, false);
	
	volSlider.addEventListener("change", controlVol, false);
*/
	[].forEach.call(genreButtons, function(button) {
		button.addEventListener('dragstart', drag, false);
	});
})();