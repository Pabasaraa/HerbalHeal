import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import styles from "./styles/login.module.css";

import { login } from "../../redux/slices/user.slice";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        dispatch(
          login({
            token: response.data.data.token,
            username: response.data.data.username,
            role: response.data.data.role,
          })
        );
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
