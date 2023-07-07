const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;  // +sign is used to automatic convert string into a number

 console.log(typeof ticketPrice);

// Save selected movie index and price  


function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");


  // for storaging data in local storage
  

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // console.log(seatsIndex);

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;    // seat count
  total.innerText = selectedSeatsCount * ticketPrice; // movie price

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// for Getting data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }


  // store movie data

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}


console.log(populateUI())


// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
 // console.log(e.target.selectedIndex, e.target.value);

  // for geting index of movie and value of movie

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {

  //console.log(e.target)
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set (from page load when page is load then it will work)
updateSelectedCount();