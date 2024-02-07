import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const NewShowsOnhome = () => {
  const [HotstarShows, setHotstarShows] = useState([]);

  useEffect(() => {
    fetch("https://hotstarbackend.onrender.com/HotstarShows")
      .then((res) => res.json())
      .then((HotstarShows) => setHotstarShows(HotstarShows))
      .catch((err) => console.error(err));
  }, []);

  const filteredTvshows = HotstarShows.filter(
    (tvshows) => tvshows.type === "tv_shows"
  );
  const filteredMovies = HotstarShows.filter((movie) => movie.type === "movies");

  return (
    <Container>
      <div>
        <StyledHeading>New on Tv shows</StyledHeading>
        <Content>
          {filteredTvshows.map((tvshows, index) => (
            <div key={index}>
              <Wrap>
                <Link to={`/detail/${tvshows._id}`}>
                  <img variant="top" src={tvshows.image} alt={tvshows.tittle} />
                </Link>
              </Wrap>
            </div>
          ))}
        </Content>
      </div>
      <StyledHeading>New on Movies</StyledHeading>
      <Content>
        {filteredMovies.map((movies, index) => (
          <div key={index}>
            <Wrap>
              <Link to={`/detail/${movies._id}`}>
                <img variant="top" src={movies.image} alt={movies.tittle} />
              </Link>
            </Wrap>
          </div>
        ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    // display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const StyledHeading = styled.h2`
  color: #ffffff;
  text-align: left;
`;

export default NewShowsOnhome;
