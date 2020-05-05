import React, { useState, useEffect, useContext, useRef } from "react";
import ReactHowler from "react-howler";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import { SongContext } from "../context/SongContext";
import SongCard from "./SongCard.js";
import fullheart from "../assests/icons/redheart.png";
import { Fab, CircularProgress } from "@material-ui/core";
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  SingleBed,
} from "@material-ui/icons";

const SearchTable = ({ song, toggleFeatured, handleAdd }) => {
  const mins = song.duration_ms
    ? Math.floor((song.duration_ms / 1000 / 60) << 0)
    : 0;
  const secs = song.duration_ms
    ? ("0" + Math.floor((song.duration_ms / 1000) % 60)).slice(-2)
    : "00";
  const songRef = useRef(new Audio(song.preview_url));
  const [togglePlay, setTogglePlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(songRef.current.currentTime);
  var timer;

  useEffect(() => {
    if (togglePlay) {
        timer = setInterval(function(){
            setCurrentTime(songRef.current.currentTime);
            if(songRef.current.ended){
                setTogglePlay(false);
                songRef.current.currentTime = 0;
                setCurrentTime(songRef.current.currentTime);
            };
        }, 100)
    } else {
        console.log(timer);
        
    }
    return () => clearInterval(timer);
  }, [togglePlay]);

  const handlePlay = (e) => {
    e.preventDefault();
    console.log(songRef.current);
    if (togglePlay) {
      setTogglePlay(false);
      songRef.current.pause();
    } else {
      setTogglePlay(true);
      songRef.current.play();
    }
  };

  return (
    <tr className="table-body" onClick={toggleFeatured}>
      <td className="first-column">{song.name}</td>
      <td>
        <div className="list-add" onClick={handleAdd}></div>
      </td>
      <td>{song.artists[0].name}</td>
      <td>
        {mins}:{secs}
      </td>
      <td
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fab style={{ zIndex: 9 }} size={"small"} onClick={handlePlay}>
          {togglePlay ? <PauseIcon /> : <PlayIcon />}
        </Fab>
        <CircularProgress
          size={48}
          style={{ position: "absolute", zIndex: 8 }}
          variant="static"
          value={(currentTime / 30) * 100}
        />
      </td>
      {/* {togglePanel &&
                                <div classe="song-visual" onClick={toggle}><FeaturedSong details={song}/></div>
                                } */}
    </tr>
  );
};

const MusicPage = (props) => {
  const initialValue = "";

  const [search, setSearch] = useState(initialValue);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [togglePage, setTogglePage] = useState(false);
  const [toggleSearchResults, setToggleSearchResults] = useState(false);
  const [togglePanel, setTogglePanel] = useState(false);
  const [toggleSuggest, setToggleSuggest] = useState(false);
  const [suggestBtnText, setSuggestBtnText] = useState(
    "Ready to see our Recommendation?"
  );
  const [loginError, setLoginError] = useState("");
  const { savedSongs, setSavedSongs } = useContext(SongContext);
  const [recommended, setRecommended] = useState([]);

  console.log(savedSongs);
  const getRecommended = (e) => {
    e.preventDefault();
    console.log(savedSongs);
    const newRecommended = savedSongs.map((song) => {
      delete song.artists;
    });
    console.log(newRecommended, "this is new recommended");
    axiosWithAuth()
      .post(
        "/api/spotify/predict",
        savedSongs
      )
      .then(async (response) => {
        console.log(response, "Got the recommended data");
        // const promise = response.data.map(async song => {
        //     const songDetail = await axiosWithAuth().get(`/api/spotify/songs/${song.id}`);
        //     return {
        //         ...song,
        //         ...songDetail
        //     }
        // })
        // const recommendSongs = await Promise.all(promise);
        setRecommended(response.data);
      })
      .catch((err) => {
        console.log({ err }, "There was an error posting to Recommended");
      });
  };

  const handleAdd = (e) => {
    const selectedSong =
      searchedSongs[e.target.parentElement.parentElement.rowIndex - 1];
    const heart = e.target;
    heart.style.backgroundImage = `url('${fullheart}')`;
    console.log(heart);

    axiosWithAuth()
      .post("/api/favorites", selectedSong)
      .then((response) => {
        console.log({ response }, "handleAdd Works");
        console.log("not ok");
        setSavedSongs([...savedSongs, response.data]);
        console.log("ok");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////// hide search section when recommend songs ///////
  const toggle = (e) => {
    if (togglePage === false) {
      setToggleSearchResults(false);
      setTogglePage(true);
      setSuggestBtnText("Search for more songs");
    } else {
      setTogglePage(false);
      setToggleSearchResults(false);
      setSuggestBtnText("Ready to see our Recommendation?");
    }
  };

  const toggleFeatured = (e) => {
    if (togglePanel === false) {
      setTogglePanel(true);
    } else {
      setTogglePanel(false);
    }
  };

  const getSearch = (song) => {
    axiosWithAuth()
      .get(`/api/spotify/search?q=${song}`)
      .then((res) => {
        console.log(res.data);
        setSearchedSongs(res.data);
        setToggleSearchResults(true);
        setToggleSuggest(true);
      })
      .catch((err) => {
        setLoginError(
          "Sorry, our app excels with Customized Recommendation. Please Sign-in."
        );
        setToggleSuggest(false);
        setToggleSearchResults(false);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearch(search);
  };

  const body = document.getElementsByTagName("body");

  body[0].className = "";
  body[0].classList.add("music-bg", "fade-in");

  return (
    <div className="music fade-in">
      {/* Search Section */}
      <div className="search">
        {toggleSuggest && (
          <div className="suggest-btn-wrapper">
            <p>{suggestBtnText}</p>
            <button className="suggest-btn" onClick={toggle}>
              Toggle Search results
            </button>
          </div>
        )}
        <h2>
          Give us your favorite track and ❤️ into your playlist
          <br /> We will surprise you with our recommendations!{" "}
        </h2>
        {loginError}
        <form onSubmit={handleSubmit}>
          <input
            name="search"
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Enter a track..."
            className="search-box"
          />
          <button className="search-btn" onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>

      {toggleSearchResults && (
        <table className="search-results-table">
          <thead>
            <tr>
              <td className="title">Track</td>
              <td className="title"></td>
              <td className="title">Artist</td>
              <td className="title">Duration </td>
              <td className="title">Preview</td>
            </tr>
          </thead>
          <tbody>
            {searchedSongs &&
              searchedSongs.map((song, index) => {
                return (
                  <SearchTable
                    song={song}
                    key={song.id}
                    toggleFeatured={toggleFeatured}
                    handleAdd={handleAdd}
                  />
                );
              })}
          </tbody>
        </table>
      )}

      {/* Suggester Section */}
      {/* TO DO */}
      {togglePage && (
        <div className="suggester">
          <button className="suggest-btn" onClick={getRecommended}>
            Get Recommended
          </button>
          {recommended &&
            recommended.map((song, index) => {
              return (
                <div key={index}>
                  <SongCard
                    song={song}
                    recommended={recommended}
                    setRecommended={setRecommended}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MusicPage;
