import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBCardImage } from "mdb-react-ui-kit";
import axios from "axios";

import Loader from "../common/Spinner";

import { Card, Button, Badge, Form } from "react-bootstrap";
import styles from "./styles/products.single.module.css";

const ProductSingle = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [imageData, setImageData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      axios
        .get(`http://localhost:8000/items/${params.id}`)
        .then((response) => {
          setProduct(response.data.data);
          const binary = Array.from(
            new Uint8Array(response.data.data.itemImages[0].data)
          )
            .map((b) => String.fromCharCode(b))
            .join("");
          setImageData(`data:image/jpeg;base64,${btoa(binary)}`);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await axios.get(
        `http://localhost:8000/reviews/${product._id}`
      );
      console.log(reviews.data.data);
      setReviews(reviews.data.data);
    };
    if (product) fetchReviews();
  }, [product]);

  const handleQuantity = (action) => {
    if (action === "increment") {
      setQuantity(quantity + 1);
    } else if (action === "decrement") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      alert("Please login first to add to cart!");
      navigate(`/login?redirect=${window.location.pathname}`);
      return;
    } else {
      const cart = localStorage.getItem("cartItems");

      const cartItem = {
        itemName: product.itemName,
        itemPrice: product.itemPrice,
        itemQuantity: quantity,
        itemImage: imageData,
      };

      if (cart) {
        const cartItems = JSON.parse(cart);
        const itemExists = cartItems.find(
          (item) => item.itemName === cartItem.itemName
        );
        if (itemExists) {
          alert("Item already exists in the cart!");
          return;
        }
        cartItems.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log(JSON.parse(localStorage.getItem("cartItems")));
      } else {
        localStorage.setItem("cartItems", JSON.stringify([cartItem]));
        console.log(JSON.parse(localStorage.getItem("cartItems")));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!localStorage.getItem("token")) {
      alert("Please login first to submit a review!");
      navigate(`/login?redirect=${window.location.pathname}`);
      return;
    }

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
    <>
      {product ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col-4">
              <img
                src={imageData}
                alt="Product"
                className={`img-fluid rounded`}
              />
            </div>
            <div className={`col-8 ${styles.productDetailSection}`}>
              <h2 style={{ marginBottom: "0" }}>{product.itemName}</h2>
              <p
                className="text-muted mt-1 mb-1"
                style={{ fontSize: "0.9rem" }}
              >
                By {product.username}
              </p>

              <Badge pill variant="info">
                Available
              </Badge>

              <div className="d-flex mt-3" style={{ fontSize: "0.8rem" }}>
                <i className="bi bi-chat-left-text-fill text-muted me-2"></i>
                <span className="text-muted">
                  {reviews ? reviews.length : 0} Reviews
                </span>
              </div>
              <hr className={styles.horizontalLine} />
              <p className="text-muted mb-4">{product.itemDescription}</p>
              <Card className={styles.productCard}>
                <Card.Body style={{ paddingBottom: "30px" }}>
                  <div className={styles.cardPrice}>
                    <Card.Title style={{ fontSize: "1rem", color: "#6C757D" }}>
                      Selling price:
                    </Card.Title>
                    <Card.Title
                      style={{
                        fontSize: "1.2rem",
                        color: "#6C757D",
                      }}
                    >
                      {product.itemPrice}{" "}
                      <span style={{ fontSize: "0.9rem" }}>LKR</span>
                    </Card.Title>
                  </div>
                  <hr
                    className="mb-3"
                    style={{ opacity: "0.15", marginTop: "0.4rem" }}
                  />
                  <div className={styles.cardTotal}>
                    <div>
                      <Card.Title
                        style={{ fontSize: "1.2rem", color: "#6C757D" }}
                      >
                        Total price:
                      </Card.Title>
                    </div>
                    <div className="text-center">
                      <Card.Title>
                        <span
                          style={{ fontSize: "0.9rem" }}
                          className="text-muted"
                        >
                          {product.itemPrice} x {quantity}
                        </span>
                      </Card.Title>
                    </div>
                    <div className="text-end">
                      <Card.Title
                        style={{
                          fontSize: "1.7rem",
                          fontWeight: "bold",
                        }}
                        className="text-success"
                      >
                        {product.itemPrice * quantity}{" "}
                        <span style={{ fontSize: "0.9rem" }}>LKR</span>
                      </Card.Title>
                    </div>
                  </div>
                  <div
                    className={`d-flex align-items-center mb-4 ${styles.quantity}`}
                  >
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantity("decrement")}
                    >
                      -
                    </Button>
                    <span
                      className="mx-3"
                      style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                    >
                      {quantity}
                    </span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantity("increment")}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="success"
                    size="lg"
                    className="w-100"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
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
                variant="success"
                type="submit"
                className="submit-btn mt-3"
              >
                Submit
              </Button>
            </Form>
          </div>
          {reviews ? (
            <>
              {reviews.length > 0 ? (
                <div>
                  {reviews.map((review, index) => (
                    <>
                      <div className="d-flex flex-start mt-5 mb-4">
                        <MDBCardImage
                          key={index}
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1683198458~exp=1683199058~hmac=c430349ec56b0918e8c14689b3cea601b7df3233a082703ca736e8758edfd22d"
                          alt="avatar"
                          width="45"
                          height="45"
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p
                                className="mb-2"
                                style={{ fontSize: "1.1rem" }}
                              >
                                Pabasaraa {review.postedBy}
                              </p>
                            </div>
                            <h5 className="mb-1" style={{ fontSize: "1rem" }}>
                              {review.reviewTitle},
                            </h5>
                            <p
                              className="small mb-0"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "10px",
                                textAlign: "justify",
                              }}
                            >
                              {review.reviewBody}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="mb-0" style={{ opacity: "0.1" }} />
                    </>
                  ))}
                </div>
              ) : (
                <div className="row mt-5 mb-5" style={{ width: "80%" }}>
                  <div className="col">
                    <h3>Reviews ({reviews.length})</h3>
                    <hr className={styles.horizontalLine} />
                    <div className="container">
                      <h5>No reviews yet!</h5>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductSingle;
