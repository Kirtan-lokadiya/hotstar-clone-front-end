import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Details() {
  const [image, setImage] = useState({});
  const { _id } = useParams();
  useEffect(() => {
    fetch(`https://hotstarbackend.onrender.com/detail/${_id}`)
      .then((res) => res.json())
      .then((image) => setImage(image))
      .catch((err) => console.error(err));
  }, [_id]);

  return (
    <Container>
      <Background>
        <img src={image.image} alt={image.tittle} />
      </Background>
      <ImageTitle>{image.tittle}</ImageTitle>
      <Description>{image.description}</Description>

    </Container>
  );

}

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 1;
  img {
    width: 100vw;
    height: 100vh;
    @media (max-width: 768px) {
      width: initial;
    }
  }
`;
const ImageTitle = styled.div`
   color: white;
  font-weight: bold;
  width: 320px;
  padding: 10px;
  margin-top: 100px;
`;

const Description = styled.div`
color: white;
   font-weight: bold;
   width: 320px;
   padding: 10px;
   margin-top: 100px;
`;


export default Details;
