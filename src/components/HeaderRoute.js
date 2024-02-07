import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Card from "react-bootstrap/Card";
import "./HotstarShows.css";
import { Link, useParams } from "react-router-dom";

function HeaderRoute() {
  const [HotstarShows, setHotstarShows] = useState([]);
  const { route } = useParams();

  useEffect(() => {
    fetch(`https://hotstarbackend.onrender.com/category/${route}`)
      .then((res) => res.json())
      .then((HotstarShows) => setHotstarShows(HotstarShows))
      .catch((err) => console.error(err));
  }, [route]);

  const truncateDescription = (description, maxLines) => {
    const lines = description.split("\n");
    const truncatedLines = lines.slice(0, maxLines);
    return truncatedLines.join("\n");
  };

  const handleLike = (itemId) => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      const data = {
        userId: userId,
        itemId: itemId,
      };

      const isLiked = HotstarShows.find((show) => show._id === itemId)?.liked;
      const method = isLiked ? "DELETE" : "PUT";

      fetch(`http://localhost:8080/likedata`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            // Update the liked status in the frontend
            setHotstarShows((prevShows) =>
              prevShows.map((show) =>
                show._id === itemId ? { ...show, liked: !show.liked } : show
              )
            );
            // Update the liked status in local storage
            updateLikedStatusInLocalStorage(itemId, !isLiked);
          } else {
            throw new Error("Error updating data in the database");
          }
        })
        .catch((error) => {
          console.error("Error updating data in the database:", error);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      fetch(`http://localhost:8080/likedata/${userId}`)
        .then((res) => res.json())
        .then((likedData) => {
          const likedItems = {};
          likedData.forEach((data) => {
            likedItems[data.itemId] = true;
          });

          const updatedShows = HotstarShows.map((show) => {
            const isLiked = likedItems[show._id] || false;
            return {
              ...show,
              liked: isLiked,
            };
          });

          setHotstarShows(updatedShows);
          localStorage.setItem("likedItems", JSON.stringify(likedItems));
        })
        .catch((err) => console.error(err));
    } // eslint-disable-next-line 
  }, []);

  const updateLikedStatusInLocalStorage = (itemId, isLiked) => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || {};
    likedItems[itemId] = isLiked;
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  };

  const isItemLiked = (itemId) => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || {};
    return likedItems[itemId] || false;
  };

  if (!Array.isArray(HotstarShows)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "#040714", marginTop: "56px" }}>
      <div className="row">
        {HotstarShows.map((item) => (
          <div key={item._id} className="col-md-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={item.image} alt="" />
              <Card.Body>
                <Card.Title>{item.tittle}</Card.Title>
                <Card.Text style={{ maxHeight: "4.9em", overflow: "hidden" }}>
                  Description: {truncateDescription(item.description, 3)}
                </Card.Text>
                <Link to={`/detail/${item._id}`} className="btn btn-primary">
                  For more details
                </Link>
                <i
                  className={`fa ${isItemLiked(item._id) ? "fa-thumbs-up" : "fa-thumbs-o-up"
                    }`}
                  style={{ fontSize: "30px", marginLeft: "20px", cursor: "pointer" }}
                  onClick={() => handleLike(item._id)}
                />
                <p style={{ margin: "0 10px 0 0" }}>Year: {item.year}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderRoute;
