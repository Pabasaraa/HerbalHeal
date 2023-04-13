import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
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
    <Container className={styles.sellerProfileContainer}>
      {sellerInfo.username ? (
        <div>
          <h2 className="text-center mt-1 mb-5">Seller Profile</h2>
          <Row>
            <Col
              md={4}
              className={styles.sellerInfo}
              style={{ marginRight: "auto" }}
            >
              <h2>{sellerInfo.username}</h2>
              <p className={styles.sellerName}>
                <b>Full Name:</b> {sellerInfo.name}
              </p>
              <p className={styles.sellerEmail}>
                <b>Email:</b> {sellerInfo.email}
              </p>
            </Col>
            <Col md={8} className={styles.reviewForm}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="reviewTitle">
                  <Form.Label>Write a Review</Form.Label>
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
            </Col>
          </Row>
          <h3 className={styles.reviewsHeader}>Reviews:</h3>
          <Row>
            {reviews.map((review, index) => (
              <Col md={4} key={index}>
                <Card className="my-3">
                  <Card.Body>
                    <Card.Title>{review.reviewTitle}</Card.Title>
                    <Card.Text>{review.reviewBody}</Card.Text>
                    <Card.Footer>
                      <small className="text-muted">
                        Posted By: {review.postedBy}
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Container>
  );
};

export default SellerProfile;
