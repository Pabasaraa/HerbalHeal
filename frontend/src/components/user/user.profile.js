import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/profile.module.css";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
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

  const deleteUser = () => {
    axios
      .delete("http://localhost:8000/users/delete", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Account deleted successfully!");
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
    <div className={styles.container}>
      <h1>Profile</h1>
      <div className={styles.details}>
        <p>Username: {user.username}</p>
        <p>Full Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
      <button
        className={styles.deleteButton}
        onClick={toggleDeleteConfirmation}
      >
        Delete Account
      </button>
      {showDeleteConfirmation && (
        <div className={styles.deleteConfirmation}>
          <p>Are you sure you want to delete your account?</p>
          <div className={styles.deleteButtons}>
            <button onClick={deleteUser}>Proceed</button>
            <button onClick={toggleDeleteConfirmation}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
