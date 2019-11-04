const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  let searchText = document.getElementById("searchText").value;
  getMovies(searchText);
});

function getMovies(searchText) {
  console.log(searchText);
  axios
    .get(`http://www.omdbapi.com/?s=${searchText}&apikey=69f13631`)
    .then(response => {
      console.log(response);

      let movies = response.data.Search;
      let output = "";
      movies.forEach(movie => {
        output += `
      <div class="col-md-3">
      <div class="text-center">
       <img src="${movie.Poster}">
        <h5>${movie.Title}</h5>
        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
      </div>
    </div>
      `;
      });
      let moviesDiv = document.getElementById("movies");
      moviesDiv.innerHTML = output;
    })
    .catch(err => console.log(err));
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get(`http://www.omdbapi.com/?i=${movieId}&apikey=69f13631`)
    .then(response => {
      console.log(response);
      let movie = response.data;
      let output = `
    <div class="row">
    <div class="col-md-4">
      <img src="${movie.Poster}" class="img-thumbnail"/>
    </div>
    <div class="col-md-8">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
     <li class="list-group-item">
       <strong>Genre: </strong> ${movie.Genre}
     </li>
     <li class="list-group-item">
     <strong>Release: </strong> ${movie.Released}
   </li>
   <li class="list-group-item">
   <strong>Rated: </strong> ${movie.Rated}
 </li>
 <li class="list-group-item">
 <strong>IMDB rating: </strong> ${movie.Director}
</li>
<li class="list-group-item">
 <strong>Writers: </strong> ${movie.Writer}
</li>
<li class="list-group-item">
 <strong>Actors: </strong> ${movie.Actors}
</li>
<li class="list-group-item">
 <strong>Language: </strong> ${movie.Language}
</li>
<li class="list-group-item">
<strong>Awards: </strong> ${movie.Awards}
</li>
<li class="list-group-item">
<strong>Box Office: </strong> ${movie.BoxOffice}
</li>
<li class="list-group-item">
<strong>Production: </strong> ${movie.Production}
</li>
    </ul>
    </div>
  </div>
  <div className="row">
  <h3>Plot</h3>
  ${movie.Plot}
  <hr>
  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View Imdb</a>
  <a href="index.html" target="_blank" class="btn btn-warning">Go back to search</a>
  </div>
    `;
      let moviesDiv = document.getElementById("movie");
      moviesDiv.innerHTML = output;
    })
    .catch(err => console.log(err));
}
