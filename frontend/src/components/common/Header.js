import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

import logo from "../../Assets/Logo.png";

function NavBar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkLoginStatus = () => {
      if (!localStorage.getItem("token")) {
        setIsLoggedin(false);
        return;
      }

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
        .then((res) => {
          setIsLoggedin(true);
          setUser(res.data.data);
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedin(false);
        });
    };

    checkLoginStatus();
  }, [token]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        padding: "0.8rem 3rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container-fluid">
        <div id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to={"/"}>
            <img src={logo} height="50" alt="MDB Logo" loading="lazy" />
          </Link>
        </div>

        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/"}
                style={{ fontSize: "1.05rem", fontWeight: "500" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/products"}
                style={{ fontSize: "1.05rem", fontWeight: "500" }}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"#"}
                style={{ fontSize: "1.05rem", fontWeight: "500" }}
              >
                Review
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"#"}
                style={{ fontSize: "1.05rem", fontWeight: "500" }}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"#"}
                style={{ fontSize: "1.05rem", fontWeight: "500" }}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {isLoggedin ? (
            <div className="d-flex align-items-center">
              <Link
                className="text-reset me-3"
                style={{ paddingLeft: "15px", margin: "0px" }}
                to={"/cart"}
              >
                <i className="fa fa-shopping-cart"></i>
              </Link>
              <Dropdown>
                <Dropdown.Toggle variant="link" id="navbarDropdownMenuAvatar">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1683198458~exp=1683199058~hmac=c430349ec56b0918e8c14689b3cea601b7df3233a082703ca736e8758edfd22d"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  {user && user.role === "seller" ? (
                    <Dropdown.Item>
                      <Link className="nav-link" to={"/profile"}>
                        Seller Dashboard
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  <Dropdown.Item>
                    <Link className="nav-link" to={"/profile"}>
                      My profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.clear();
                      setIsLoggedin(false);
                      setUser(null);
                      navigate("/login");
                    }}
                  >
                    <button
                      className={`btn btn-link `}
                      style={{
                        margin: "0px",
                        padding: "0px",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      Logout
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-link px-3 me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
