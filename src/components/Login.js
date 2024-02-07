import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    fetch("https://hotstarbackend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          const token = data.token.toString();
          const user = data.username.toString();
          localStorage.setItem("token", token);
          localStorage.setItem("username", user);
          setMessage(data.message);
          navigate("/");
          // Reload the page after successful login
          window.location.reload();
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred while logging in");
      });
  }

  return (
    <div className="container mt-5" style={{ color: "white" }}>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {message && <div className="alert alert-warning">{message}</div>}

        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>If you do not have an Account </p>
        <Link to="/signup" style={{ color: "white" }}>
          Click here for signup
        </Link>
      </Form>
    </div>
  );
};

export default Login;
