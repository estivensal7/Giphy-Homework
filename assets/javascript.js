$(document).ready(function() {

				
	// initial array of animal buttons
	const animals = ['Dog', 'Cat', 'Lion'];

	// function for api
	function displayAnimalGifs() {

		const animal = $(this).attr('data-name');
		const queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ZkCSEeyRzv6qONfq1KlvcENHqVld8tgD&limit=10"

		//creating ajax call for specific animal button called
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			
			const results = response.data;	

			for(let i = 0; i<results.length; i++) {
				//creating div to hold the gifs
				const gifDiv = $("<div class='animalPlace'>");
				//creating image tag and adding classes to images
				const gifImage = $("<img class='gif-image'>");
				//adding rating value to rating variable
				const rating = results[i].rating;
				//creating p element to hold rating value
				const p = $("<p>").text("Rating:"+rating.toUpperCase());
				//adding still image attr to images
				gifImage.attr("src", results[i].images.fixed_height_still.url);
				//adding data-still attr to still images
				gifImage.attr("data-still", results[i].images.fixed_height_still.url);
				//adding data-animate attr to animated images
				gifImage.attr("data-animate", results[i].images.fixed_height.url);
				//making default image state to "still"
				gifImage.attr("data-state", "still");

				//prepending p element with ratings to gifDiv
				gifDiv.prepend(p);
				//prepending images to gifDiv
				gifDiv.prepend(gifImage);
				//prepending gifDiv to HTML
				$("#gifs-holder").prepend(gifDiv);

			};

			//creating on click event to play/pause gifs
			$(".gif-image").on("click", function() {

			//creating state variable 
			let state = $(this).attr("data-state");

			//if/else statement to switch between still, and animate
			if (state==="still") {
				$(this).attr("src", $(this).attr("data-animate"))
				$(this).attr("data-state", "animate");
			} 

			else {
				$(this).attr("src", $(this).attr("data-still"))
				$(this).attr("data-state", "still");
			}

			});

		})
	}

	function renderButtons() {

		// deleting the buttons listed prior to adding new buttons
		$("#buttons-holder").empty();

		//looping through the array of buttons
		for(let i = 0; i <animals.length; i++) {

			//dynamically generating buttons for every animal in the array
			const b = $("<button>");

			//adding class to the buttons generated
			b.addClass("animal");

			//adding data-attribute
			b.attr("data-name", animals[i]);

			//adding inital button text
			b.text(animals[i]);

			
			//adding buttons to the buttons-holder view
			$("#buttons-holder").append(b);
		}
	}

	//event handler for when animal button is clicked
	$("#add-animal").on("click", function(event) {
		event.preventDefault();

		const animal = $("#animal-input").val().trim();

		animals.push(animal);

		renderButtons();
	});

	$(document).on("click", ".animal", displayAnimalGifs);

	renderButtons();
})