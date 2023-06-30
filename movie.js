    const apiKey = "4e97df75";
    const searchMovie = document.getElementById("searchMovie");
    const movieContainer = document.getElementById("movieContainer");

    async function logJSONData() {
      const inputMovie = document.getElementById("inputMovie").value;
      console.log(inputMovie);

      movieContainer.innerHTML = ""; // Clear previous content

      if (inputMovie === "") {
        const defaultResponse = await fetch(`http://www.omdbapi.com/?i=tt1630029&apikey=${apiKey}`);
        const defaultMovieData = await defaultResponse.json();
        console.log(defaultMovieData);

        const defaultCard = createMovieCard(defaultMovieData);
        movieContainer.appendChild(defaultCard);
      } else {
        const response = await fetch(`http://www.omdbapi.com/?s=${inputMovie}&apikey=${apiKey}`);
        const jsonData = await response.json();
        console.log(jsonData);

        if (jsonData.Search) {
          for (let i = 0; i < jsonData.Search.length; i++) {
            const movie = jsonData.Search[i];
            const card = createMovieCard(movie);
            movieContainer.appendChild(card);
          }
        } else {
          const p = document.createElement("p");
          p.className = "message";
          p.innerHTML = jsonData.Error;
          movieContainer.appendChild(p);
        }
      }
    }

    function createMovieCard(movie) {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("h1");
      title.className = "movieTitle";
      title.innerHTML = movie.Title;
      card.appendChild(title);

      const year = document.createElement("h4");
      year.className = "movieYear";
      year.innerHTML = movie.Year;
      card.appendChild(year);

      const id = document.createElement("h5");
      id.className = "movieId";
      id.innerHTML = movie.imdbID;
      card.appendChild(id);

      const type = document.createElement("h6");
      type.className = "movieType";
      type.innerHTML = movie.Type;
      card.appendChild(type);

      const poster = document.createElement("img");
      poster.className = "moviePoster";
      poster.alt = "movie-poster";
      poster.src = movie.Poster;
      card.appendChild(poster);

      const btn = document.createElement("button");
      btn.className = "watchMovie";
      btn.innerHTML = "Watch Movie"
      card.appendChild(btn);

      return card;
    }

    // Call logJSONData once when the page loads
    logJSONData();

    searchMovie.addEventListener("click", () => {
      logJSONData();
    });

   inputMovie.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
      logJSONData();
    }
   })

