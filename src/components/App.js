import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=hooked&apikey=821b297f';

const App = () =>  {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
  fetch(MOVIE_API_URL)
    .then(res => res.json())
    .then(jsonResponse => {
      setMovies(jsonResponse.Search);
      setLoading(false);
    });
  }, []);　// 空の配列を渡してcomponentDidMountと同じく初回だけ呼ばれるようにする

  const search = searchValue => {
  setLoading(true);
  setErrorMessage(null)

  fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=821b297f`)
    .then(res => res.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === 'True') {
        setMovies(jsonResponse.Search); // 返ってきたオブジェクトをsetMoviesで定義した配列に保存する
        setLoading(false);
      } else {
        setErrorMessage(jsonResponse.Error);
        setLoading(false);
      }
    });
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
