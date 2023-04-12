import React, { useState } from "react";
import axios from "axios";
import styles from "./styles/register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    role: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:8000/users/register", formData)
      .then(() => {
        alert("Registration successful!");
      })
      .catch((err) => {
        alert("Registration failed, " + err.response.data.message);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role:</label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="seller"
              name="role"
              value="seller"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="seller">Seller</label>
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="user">User</label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default Register;
