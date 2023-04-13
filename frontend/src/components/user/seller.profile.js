import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles/seller.profile.module.css";

const SellerProfile = () => {
  const [sellerInfo, setSellerInfo] = useState({});
  const [reviews, setReviews] = useState([]);

  const params = useParams();

  const seller_id = params.id;

  useEffect(() => {
    const fetchSellerInfo = async () => {
      const response = await axios.get(
        `http://localhost:8000/users/${seller_id}`
      );
      setSellerInfo(response.data);
    };
    fetchSellerInfo();
  }, [seller_id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await axios.get(
        `http://localhost:8000/reviews/${seller_id}`
      );
      console.log(reviews.data.data);
      setReviews(reviews.data.data);
    };
    fetchReviews();
  }, [seller_id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const review = {
      reviewTitle: event.target.reviewTitle.value,
      reviewBody: event.target.reviewBody.value,
      postedOn: params.id,
      token: localStorage.getItem("token"),
    };

    axios
      .post("http://localhost:8000/reviews/new", review)
      .then((response) => {
        alert("Review submitted successfully!");
        setReviews([...reviews, response.data.data]);
        event.target.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      {sellerInfo.username ? (
        <div>
          <h2>{sellerInfo.username}</h2>
          <p>Full Name: {sellerInfo.name}</p>
          <p>Email: {sellerInfo.email}</p>
          <h3>Reviews:</h3>
          {/** form to submit a review */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="review">
              Leave a review:
            </label>
            <h4 htmlFor="reviewTitle">Review Title:</h4>
            <input
              className={styles.input}
              type="text"
              id="review"
              name="reviewTitle"
            />
            <h4 htmlFor="reviewBody">Review Body:</h4>
            <input
              className={styles.input}
              type="text"
              id="review"
              name="reviewBody"
            />
            <br />
            <button className={styles.button} type="submit">
              Submit
            </button>
          </form>
          <ul className={styles.ul}>
            {reviews.map((review, index) => (
              <li className={styles.li} key={index}>
                <h3>
                  <i>Review Title:</i> <br />
                  {review.reviewTitle}
                </h3>
                <p>
                  <i>Review Body:</i> <br />
                  {review.reviewBody}
                </p>
                <p>
                  <i>Posted By:</i> {review.postedBy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default SellerProfile;
