import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateToken = () => {
    if (!localStorage.getItem("token")) return;

    axios
      .post(
        "http://localhost:8000/users/validatetoken",
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    validateToken(); // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8000/users/login", user)
      .then((response) => {
        alert("Login successful!");

        localStorage.setItem("token", response.data.data.token);
        navigate("/profile");
      })
      .catch((error) => {
        alert("Login failed, " + error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
        <input
          className={styles.input}
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className={styles.button} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
