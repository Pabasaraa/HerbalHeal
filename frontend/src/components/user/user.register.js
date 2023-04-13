import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles/login.module.css";

const Register = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    role: "",
    password: "",
    repeatPassword: "",
  });

  const navigate = useNavigate();

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
        navigate("/login");
      })
      .catch((err) => {
        alert("Registration failed, " + err.response.data.message);
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
                  <h2 className="mb-3">Sign up</h2>

                  <hr className="mb-4" style={{ opacity: "0.15" }} />

                  <div className="form-outline mb-4">
                    <label
                      htmlFor="role"
                      className="mb-3"
                      style={{ color: "#585555", fontSize: "1.1rem" }}
                    >
                      Register as a
                    </label>
                    <div className="card-group">
                      <div
                        className={`card ${
                          role === "seller" ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => setRole("seller")}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <input
                            type="radio"
                            id="seller"
                            name="role"
                            value="seller"
                            className="form-check-input visually-hidden"
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="seller" className="form-check-label">
                            Seller
                          </label>
                        </div>
                      </div>
                      <div
                        className={`card ${
                          role === "user" ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => setRole("user")}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <input
                            type="radio"
                            id="user"
                            name="role"
                            value="user"
                            className="form-check-input visually-hidden"
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="user" className="form-check-label">
                            Buyer
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="repeatPassword"
                      className="form-control"
                      placeholder="Re-enter Password"
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={handleInputChange}
                      required
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
                      Agree to terms & conditions{" "}
                    </label>
                  </div>

                  <button
                    className={styles.btn_login}
                    style={{ marginTop: "15px", width: "fit-content" }}
                    type="submit"
                  >
                    Sign up
                  </button>

                  <hr className="my-4" style={{ opacity: "0.15" }} />

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Already have an account?</p>
                    <button
                      className={styles.clickableText}
                      onClick={() => navigate("/login")}
                    >
                      Login here
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
export default Register;
