import React, { useState, useEffect } from "react";
import requests from "../request";
import instance from "../axios";
import "../css/banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.ceil(Math.random() * (request.data.results.length - 1))
        ]
      );
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, max) {
    return str?.length > max ? str.substr(0, max - 1) + "…" : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        // backgroundPosition: "center center",
      }}
    >
      <div className="bannerContent">
        <h1 className="bannerTitle">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="bannerButtons">
          <button className="bannerBtn">Play</button>
          <button className="bannerBtn">My List</button>
        </div>
        <p className="bannerDescription">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="bannerFadeBottom"></div>
    </header>
  );
};

export default Banner;
