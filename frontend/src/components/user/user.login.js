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
    <section className={styles.gradientForm}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{
                borderRadius: "15px",
                borderColor: "white",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div className="card-body p-5 text-center">
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-3">Sign in</h2>

                  <hr className="mb-5" style={{ opacity: "0.15" }} />

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      name="user_name"
                      onChange={handleUsernameChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div
                    className="form-check d-flex justify-content-start mb-4"
                    style={{ marginTop: "25px" }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="terms"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="terms"
                      style={{ marginLeft: "10px", color: "#585555" }}
                    >
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>

                  <button
                    className={styles.btn_login}
                    style={{ marginTop: "15px", width: "fit-content" }}
                    type="submit"
                  >
                    Login
                  </button>

                  <hr className="my-4" style={{ opacity: "0.15" }} />

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button
                      className={styles.clickableText}
                      onClick={() => navigate("/register")}
                    >
                      Register here
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
