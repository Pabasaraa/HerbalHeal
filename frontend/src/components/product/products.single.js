import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import axios from "axios";

import { addToCart } from "../../redux/slices/cart.slice";

import Loader from "../common/Spinner";

import { Card, Button, Badge, Form } from "react-bootstrap";
import styles from "./styles/products.single.module.css";

const ProductSingle = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [imageData, setImageData] = useState(null);

  const params = useParams();

  const dispatch = useDispatch();

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

  //chavi
  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      alert("Please login first to add to cart!");
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
    <div className="container">
      {product && reviews ? (
        <div className="row mt-3">
          <div className="col-4">
            <img
              src={imageData}
              alt="Product"
              className={`img-fluid rounded`}
            />
          </div>
          <div className={`col-8 ${styles.productDetailSection}`}>
            <h2 style={{ marginBottom: "0" }}>{product.itemName}</h2>
            <p className="mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
              By {product.username}
            </p>
            <div className="d-flex mb-3" style={{ fontSize: "0.8rem" }}>
              <i className="bi bi-chat-left-text-fill text-muted me-2"></i>
              <span className="text-muted">{reviews.length} Reviews</span>
            </div>

            <Badge pill variant="info" bg="success">
              In Stock
            </Badge>
            <hr className={styles.horizontalLine} />
            <p className="text-muted mb-4">{product.itemDescription}</p>
            <Card className={styles.productCard}>
              <Card.Body>
                <div className={styles.cardPrice}>
                  <Card.Title style={{ fontSize: "1.1rem", color: "#6C757D" }}>
                    Selling price:
                  </Card.Title>
                  <Card.Title
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#6C757D",
                    }}
                  >
                    {product.itemPrice} LKR
                  </Card.Title>
                </div>
                <div className={styles.cardTotal}>
                  <div>
                    <Card.Title
                      style={{ fontSize: "1.2rem", color: "#6C757D" }}
                    >
                      Total price:
                    </Card.Title>
                  </div>
                  <div className="text-center">
                    <Card.Title
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      <span
                        style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                        className="text-muted"
                      >
                        {product.itemPrice} x {quantity}
                      </span>
                    </Card.Title>
                  </div>
                  <div className="text-end">
                    <Card.Title
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                      }}
                      className="text-success"
                    >
                      {product.itemPrice * quantity} LKR
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
      ) : (
        <Loader />
      )}
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
          <Button variant="success" type="submit" className="submit-btn mt-3">
            Submit
          </Button>
        </Form>
      </div>
      {reviews ? (
        <div className="row mt-5">
          <div className="col">
            <h3>Reviews ({reviews.length})</h3>
            <hr className={styles.horizontalLine} />
            <div className="container">
              {reviews.map((review, index) => (
                <Card key={index} className="mb-4" style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Title>{review.reviewTitle}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      <p>
                        <span style={{ fontSize: "0.8rem" }}>
                          Posted By: {review.postedBy}
                        </span>{" "}
                      </p>
                    </Card.Subtitle>
                    <hr className={styles.horizontalLine} />
                    <Card.Body>{review.reviewBody}</Card.Body>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductSingle;
