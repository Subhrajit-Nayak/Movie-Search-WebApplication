const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieContainer = document.getElementById("movieContainer");

// API Key
const API_KEY = "d44db93f";

searchBtn.addEventListener("click", () => {
  searchMovies(movieInput.value);
});

async function searchMovies(movieName) {

  if(movieName.trim() === "") {
    alert("Please enter movie name");
    return;
  }

  movieContainer.innerHTML = `
    <h3 class="text-center">Loading...</h3>
  `;

  try {

    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${API_KEY}`
    );

    const data = await response.json();

    if(data.Response === "False") {

      movieContainer.innerHTML = `
        <h3 class="text-center text-danger">
          Movie not found
        </h3>
      `;

      return;
    }

    displayMovies(data.Search);

  } catch(error) {

    movieContainer.innerHTML = `
      <h3 class="text-center text-danger">
        Something went wrong
      </h3>
    `;

    console.log(error);
  }
}

function displayMovies(movies) {

  movieContainer.innerHTML = "";

  movies.forEach(movie => {

    movieContainer.innerHTML += `
    
      <div class="col-md-3 mb-4">

        <div class="card bg-dark text-white movie-card h-100">

          ${
            movie.Poster !== "N/A"
            ? `<img src="${movie.Poster}" class="card-img-top">`
            : `<div class="no-image">No Image</div>`
          }

          <div class="card-body">

            <h5 class="card-title">
              ${movie.Title}
            </h5>

            <p class="card-text">
              Year: ${movie.Year}
            </p>

            <p class="card-text">
              Type: ${movie.Type}
            </p>

          </div>

        </div>

      </div>
    `;
  });
}