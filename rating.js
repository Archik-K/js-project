const stars = document.querySelectorAll(".star");
const ratingValue = document.getElementById("rating-value");

stars.forEach((star) => {
	star.addEventListener("click", setRating);
	star.addEventListener("mouseover", hoverRating);
	star.addEventListener("mouseout", resetRating);
});

let currentRating = 0;

function setRating(event) {
	const clickedStar = event.target;
	const rating = parseInt(clickedStar.getAttribute("data-rating"));
	currentRating = rating;
	updateRating();
}

function hoverRating(event) {
	const hoveredStar = event.target;
	const rating = parseInt(hoveredStar.getAttribute("data-rating"));
	updateRating(rating);
}

function resetRating() {
	updateRating();
}

function updateRating(rating = currentRating) {
	stars.forEach((star) => {
		const starRating = parseInt(star.getAttribute("data-rating"));
		if (starRating <= rating) {
			star.classList.add("active");
		} else {
			star.classList.remove("active");
		}
	});

	ratingValue.textContent = `Рейтинг: ${rating}`;
}
