const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const API_KEY = "7b8ce54b";

// Modal Elements
const modal = document.getElementById('movieModal');
const modalContent = document.getElementById('movieDetails');
const closeBtn = document.querySelector('.close-btn');

// Search movies
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  resultsDiv.innerHTML = "";

  if (!query) {
    resultsDiv.innerHTML = "<p>Please type a movie name to search.</p>";
    return;
  }

  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  const data = await response.json();

  if (data.Response === "False") {
    resultsDiv.innerHTML = "<p>No movies found.</p>";
    return;
  }

  data.Search.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'movie';
    div.dataset.id = movie.imdbID; // Store ID for details

    const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/60x90";

    div.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
      </div>
    `;

    // Click to show details
    div.addEventListener('click', () => fetchMovieDetails(movie.imdbID));

    resultsDiv.appendChild(div);
  });
});

// Fetch movie details
async function fetchMovieDetails(id) {
  const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
  const data = await response.json();

  modalContent.innerHTML = `
    <h2>${data.Title} (${data.Year})</h2>
    <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200"}" alt="${data.Title}">
    <p><strong>Genre:</strong> ${data.Genre}</p>
    <p><strong>Director:</strong> ${data.Director}</p>
    <p><strong>Actors:</strong> ${data.Actors}</p>
    <p><strong>Plot:</strong> ${data.Plot}</p>
    <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
  `;

  modal.style.display = "block";
}

// Close modal
closeBtn.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = "none";
});
