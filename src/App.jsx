import React, { useEffect, useState } from "react";
import Search from "./compenents/search.jsx";
import Spinner from "./compenents/spinner.jsx";
import Moviecard from "./compenents/moviecard.jsx";
import Updatecnt, { getTrendingSearches } from "./appwrite.js";
function App() {
  const API_BASE = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_URL;

  const [trending, setTrending] = useState([]);
  const [search, Setsearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchmovies = async (query = "") => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = query
        ? `${API_BASE}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (!data.results) {
        setMovies([]);
        return;
      }

      setMovies(data.results);

      if (query && data.results.length > 0) {
        Updatecnt(query, data.results[0]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const settrending = async () => {
    try{
      const trending = await getTrendingSearches();
      setTrending(trending);
    }
    catch(err){ 
      console.error('error fetching trending searches:');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchmovies(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    settrending();
  }, []);
  return (
    <div className="pattern">
      <div className="wrapper">
        <img className="hero-image" src="/1.png" alt="background" />

        <h1>MOVIES SEARCH APP</h1>
        <br />
        <h1>
          Search <span className="text-gradient">movies </span>you enjoy watching
        </h1>

     {trending.length > 0 && (
          <section className="trending">
            <h2>Trending Searches</h2>
            <ul>
              {trending.map((movie,index) => (
                <li key={movie.$id ?? movie.id ?? `${movie.searchterm}-${index}`}> 
                <p>{index+1}</p>
                <img src={movie.poster} alt="movie poster" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <Search sea={search} setsea={Setsearch} />

        <section className="all-movies">
          <h2>{search ? `Results for "${search}"` : "Popular Movies"}</h2>

          {loading && <Spinner />}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && movies.length > 0 && (
            <div className="movie-list">
              {movies.map((movie) => (
                <Moviecard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
