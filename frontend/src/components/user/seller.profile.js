import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button, Badge } from "react-bootstrap";
import Loader from "../common/Spinner";
import styles from "./styles/seller.profile.module.css";

const SellerProfile = () => {
  const [sellerInfo, setSellerInfo] = useState({});
  const [reviews, setReviews] = useState(null);

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
    setTimeout(() => {
      fetchReviews();
    }, 2000);
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
    <div>
      {sellerInfo.username ? (
        <div className={styles.sellerProfileContainer}>
          <h2 className="text-center mt-1 mb-4">Seller Profile</h2>
          <Card className="mb-5" style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title>{sellerInfo.username}</Card.Title>
              <Badge pill variant="info" bg="info">
                Seller
              </Badge>
              <Card.Text className="mt-4 mb-4">
                <Card.Subtitle className="mb-3 text-muted">
                  Seller Details
                </Card.Subtitle>
                <div className="mb-1">
                  <b>Full Name:</b> {sellerInfo.name}
                </div>
                <div className="mb-2">
                  <b>Email:</b> {sellerInfo.email}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <div className={styles.reviewForm}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="reviewTitle">
                <Form.Label>
                  <h5>Write a Review</h5>
                </Form.Label>
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Enter review title"
                  required
                />
              </Form.Group>
              <Form.Group controlId="reviewBody">
                <Form.Control
                  className="mt-3"
                  as="textarea"
                  rows={3}
                  placeholder="Write your review"
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="submit-btn mt-3"
              >
                Submit
              </Button>
            </Form>
          </div>
          {reviews ? (
            <div className={styles.payments}>
              <h3 className="mb-4 mt-5">Reviews & Ratings</h3>
              {reviews.map((review) => (
                <Card className="mb-4" style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Title>{review.reviewTitle}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      <span style={{ fontSize: "0.9rem" }}>Posted By:</span>{" "}
                      {review.postedBy}
                    </Card.Subtitle>
                    <Card.Body>{review.reviewBody}</Card.Body>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SellerProfile;
