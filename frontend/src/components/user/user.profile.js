import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import styles from "./styles/profile.module.css";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  function ValidateToken(callback) {
    if (!localStorage.getItem("token")) {
      return false;
    }

    //send axios request to server to validate token with custom header
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
        console.log(res.data.data._id);
        callback(res.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getUser = async (_id) => {
    const user = await axios.get(`http://localhost:8000/users/${_id}`);
    setUser(user.data);
  };

  useEffect(() => {
    console.log("validating token");
    ValidateToken(getUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const deleteUser = () => {
    axios
      .delete("http://localhost:8000/users/delete", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Account deleted successfully!");
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) => {
        alert("Account deletion failed, " + err.response.data.message);
      });
  };

  const toggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  return (
    <div>
      {user ? (
        <div className={styles.container}>
          <div className={styles.welcome}>
            <h1>
              Welcome{" "}
              <b style={{ fontSize: "3rem", color: "#4468E2" }}>
                {user.username}
              </b>
              !
            </h1>
            <Card.Subtitle className="text-muted">
              Here is your profile information.
            </Card.Subtitle>
            <br />
          </div>
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              {user.role === "seller" ? (
                <Badge pill variant="info" bg="info">
                  Seller
                </Badge>
              ) : (
                <Badge pill variant="primary" bg="primary">
                  Buyer
                </Badge>
              )}
              <Card.Text className="mt-4 mb-4">
                <Card.Subtitle className="mb-3 text-muted">
                  Your Details
                </Card.Subtitle>
                <div className="mb-1">
                  <b>Full Name:</b> {user.name}
                </div>
                <div className="mb-2">
                  <b>Email:</b> {user.email}
                </div>
              </Card.Text>
              <Button variant="secondary" onClick={logout}>
                Log Out
              </Button>
            </Card.Body>
          </Card>
          {user.role === "seller" ? (
            <div className={styles.payments}>
              <h3 className="mb-4 mt-5">Reviews & Ratings</h3>
              <Card>
                <Card.Body>
                  <Card.Title>Review #1</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    <span style={{ fontSize: "0.9rem" }}>Posted By:</span>{" "}
                    sandaluu
                  </Card.Subtitle>
                  <Card.Header>Test Review Title</Card.Header>
                  <Card.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas vel mi elit. Ut malesuada, tortor at dictum semper,
                    quam sapien accumsan urna, vitae bibendum ante nisl sit amet
                    turpis.
                  </Card.Body>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <div className={styles.orders}>
              {orders.length === 0 ? (
                <Card.Title className="mt-5 mb-2">
                  You have no orders yet..{" "}
                  <button
                    className={styles.clickableText}
                    onClick={() => {
                      alert("Shop is under development");
                    }}
                  >
                    Shop now
                  </button>
                </Card.Title>
              ) : (
                <div className={styles.payments}>
                  <h3 className="mb-4 mt-5">Your Orders</h3>
                  <Card>
                    <Card.Body>
                      <Card.Title>Order #1</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        01/01/2022
                      </Card.Subtitle>
                      <Card.Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas vel mi elit. Ut malesuada, tortor at dictum
                        semper, quam sapien accumsan urna, vitae bibendum ante
                        nisl sit amet turpis.
                      </Card.Text>
                      <Badge variant="primary" className={styles.status}>
                        Pending
                      </Badge>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </div>
          )}
          <br />
          <Button
            className={styles.deleteButton}
            onClick={toggleDeleteConfirmation}
          >
            Delete Account
          </Button>
          {showDeleteConfirmation && (
            <div className={styles.deleteConfirmation}>
              <p>Are you sure you want to delete your account?</p>
              <div className={styles.deleteButtons}>
                <Button onClick={deleteUser}>Proceed</Button>
                <Button onClick={toggleDeleteConfirmation}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>Loading ....</h1>
      )}
    </div>
  );
};

export default Profile;
