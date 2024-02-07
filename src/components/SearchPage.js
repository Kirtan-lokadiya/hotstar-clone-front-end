import React, { useState, useRef, useEffect } from "react";
import SearchResults from "./SearchResults";
import "./SearchPage.css";


const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const searchInputRef = useRef(null);
  const timeoutRef = useRef(null);

  const searchHandle = async (e) => {
    e.preventDefault();
    const key = searchInputRef.current.value;
    if (key) {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
      timeoutRef.current = setTimeout(async () => {
        let result = await fetch(`https://hotstarbackend.onrender.com/api/search/${key}`);
        result = await result.json();
        if (result) {
          setSearchResults(result);
          setFormSubmitted(true);
        }
      }, 1000);
    } else {
      setSearchResults([]);
      setFormSubmitted(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchHandle(e);
    }
  };

  const resetForm = () => {
    setSearchResults([]);
    setFormSubmitted(false);
    searchInputRef.current.value = "";
  };

  useEffect(() => {
    setSearchResults([]);
    searchInputRef.current.value = "";
  }, []);

  return (
    <>
      <div className="search-page-container">
        <form className="form-inline my-2 my-lg-0" onSubmit={searchHandle}>
          <input
            className="form-control mr-sm-2"
            ref={searchInputRef}
            type="text"
            placeholder="Movies, shows and more"
            aria-label="Search"
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
      {formSubmitted && (
        <SearchResults searchResults={searchResults} resetForm={resetForm} />
      )}
    </>
  );
};

export default SearchPage;