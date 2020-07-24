const movieSelector = document.getElementById("movieSelector");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const container = document.querySelector(".container");

UI();

function UI() {
  const IndexArray = JSON.parse(localStorage.getItem("IndexArray"));
  if (IndexArray !== null && IndexArray.length > 0) {
    seats.forEach(function (seat, index) {
      if (IndexArray.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const movieName = JSON.parse(localStorage.getItem("movieName"));
  if (movieName !== null) {
    movieSelector.selectedIndex = movieName;
  }
}
function changedMovies() {
  movieSelector.addEventListener("change", (e) => {
    localStorage.setItem("movieName", e.target.selectedIndex);
    localStorage.setItem("ticketPrice", e.target.value);
    calculateCountPrice();
  });
}

function calculateCountPrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsArr = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  const numOfSelectedSeats = selectedSeatsArr.length;
  localStorage.setItem("IndexArray", JSON.stringify(selectedSeatsArr));
  total.innerText = movieSelector.value * numOfSelectedSeats;
  count.innerText = numOfSelectedSeats;
  changedMovies();
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    calculateCountPrice();
  }
});
calculateCountPrice();
