import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import styles from "./styles/Cart.module.css";

const Cart = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems) {
      setCartItems(cartItems);
    }

    console.log(cartItems);
  }, [localStorage.getItem("cartItems")]);

  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };

  const handleShippingDetailsChange = (event) => {
    setShippingDetails({
      ...shippingDetails,
      [event.target.name]: event.target.value,
    });
  };

  function removeItem(itemName) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    console.log("HI" + itemName);
    const newCartItems = cartItems.filter((item) => item.itemName !== itemName);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
    console.log(newCartItems);
  }

  const itemsTotal = cartItems
    ? cartItems.reduce((total, item) => total + item.itemQuantity, 0)
    : 0;
  const subtotal = cartItems
    ? cartItems.reduce(
        (total, item) => total + item.itemPrice * item.itemQuantity,
        0
      )
    : 0;

  const shippingPrice = shippingMethod === "home_delivery" ? 1500 : 0;
  const total = subtotal + shippingPrice;

  const renderProducts = () => {
    return (
      <div>
        {cartItems ? (
          cartItems.map((product, index) => (
            <Card
              key={index}
              className={`${styles.product} ${styles.cardBody}`}
              style={{ padding: "10px 20px" }}
            >
              <Row>
                <Col xs={12} md={4}>
                  <Card.Img src={product.itemImage} alt={product.itemName} />
                </Col>
                <Col xs={12} md={8}>
                  <Card.Body>
                    <Card.Title>{product.itemName}</Card.Title>
                    <Row>
                      <Col xs={6} md={4}>
                        <Card.Text
                          className={styles.cardSubText}
                        >{`Price: ${product.itemPrice} LKR`}</Card.Text>
                      </Col>
                      <Col xs={6} md={4}>
                        <Card.Text
                          style={{
                            width: "fit-content",
                            margin: "0 auto",
                          }}
                          className={styles.cardSubText}
                        >{`Qty: ${product.itemQuantity}`}</Card.Text>
                      </Col>
                      <Col xs={12} md={4}>
                        <Card.Text
                          style={{ width: "fit-content", float: "right" }}
                          className={styles.cardSubText}
                        >{`Total: $${
                          product.itemPrice * product.itemQuantity
                        }`}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Button
                    variant="none"
                    className={styles.removeBtn}
                    onClick={() => {
                      removeItem(product.itemName);
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <h4 className="text-center">No items in the cart</h4>
        )}
      </div>
    );
  };

  const renderShippingDetailsForm = () => {
    return (
      <form className="formt" style={{ margin: "0px 20px 0px 20px" }}>
        <div className="mt-4 mb-4">
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="form-group">
              <label
                for="inputCard"
                className={styles.label}
                style={{ marginBottom: "10px" }}
              >
                Street Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputStreet"
                placeholder="Street Address"
                value={shippingDetails.zip}
                onChange={handleShippingDetailsChange}
                style={{ paddingLeft: "15px" }}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "15px" }}>
            <div className={`form-group`}>
              <label
                for="inputCard"
                className={styles.label}
                style={{ marginBottom: "10px" }}
              >
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCountry"
                placeholder="Country"
                value={shippingDetails.zip}
                onChange={handleShippingDetailsChange}
                style={{ paddingLeft: "15px" }}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="form-group">
              <label
                for="inputCard"
                className={styles.label}
                style={{ marginBottom: "10px" }}
              >
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCard"
                pattern="\d*"
                placeholder="City"
                value={shippingDetails.zip}
                onChange={handleShippingDetailsChange}
                style={{ paddingLeft: "15px" }}
              />
            </div>
          </div>
          <div
            className="row"
            style={{ marginTop: "15px", marginBottom: "55px" }}
          >
            <div className="form-group col-md-6">
              <label
                for="inputCard"
                className={styles.label}
                style={{ marginBottom: "10px" }}
              >
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="inputExpiryDate"
                placeholder="State"
                value={shippingDetails.zip}
                onChange={handleShippingDetailsChange}
                style={{ paddingLeft: "15px" }}
              />
            </div>
            <div className="form-group col-md-6">
              <label
                for="inputCard"
                className={styles.label}
                style={{ marginBottom: "10px" }}
              >
                Zip Code
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCvv"
                placeholder="Zip"
                value={shippingDetails.zip}
                onChange={handleShippingDetailsChange}
                style={{ paddingLeft: "15px" }}
              />
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="container">
      {cartItems.length !== 0 ? (
        <div className="row">
          <h3 className="mt-3">
            <b>Shopping Cart</b>
          </h3>
          <hr style={{ opacity: "0.1" }} className="mt-2 mb-5" />
          <div className={`col-md-8 ${styles.cart}`}>
            {renderProducts()}
            <div className={styles.shippingEstimates}>
              <h4>
                <b>Shipping Estimates</b>
              </h4>
              <hr style={{ opacity: "0.1" }} className="mt-3 mb-5" />
              <div className="d-flex flex-column">
                <Card
                  className={`mb-3 ${
                    shippingMethod === "home_delivery" ? "bg-light" : ""
                  } ${styles.cardBody}`}
                  onClick={() => setShippingMethod("home_delivery")}
                >
                  <Card.Body>
                    <input
                      type="radio"
                      id="home_delivery"
                      name="shipping_method"
                      value="home_delivery"
                      checked={shippingMethod === "home_delivery"}
                      onChange={handleShippingMethodChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="home_delivery"
                      style={{ marginLeft: "10px" }}
                    >
                      Home Delivery
                    </label>
                  </Card.Body>
                  {shippingMethod === "home_delivery" && (
                    <Card.Footer style={{ background: "white" }}>
                      {renderShippingDetailsForm()}
                    </Card.Footer>
                  )}
                </Card>

                <Card
                  className={`mb-3 ${
                    shippingMethod === "store_pickup" ? "bg-light" : ""
                  } ${styles.cardBody}`}
                  onClick={() => setShippingMethod("store_pickup")}
                >
                  <Card.Body>
                    <input
                      type="radio"
                      id="store_pickup"
                      name="shipping_method"
                      value="store_pickup"
                      checked={shippingMethod === "store_pickup"}
                      onChange={handleShippingMethodChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="store_pickup"
                      style={{ marginLeft: "10px" }}
                    >
                      Store Pickup
                    </label>
                  </Card.Body>
                  {shippingMethod === "store_pickup" && (
                    <Card.Footer style={{ background: "white" }}>
                      <div className={styles.shippingDetails}>
                        <p>Store Name: HerbalHeal Pvt(Ltd)</p>
                        <p>Address: 123 Main St, Anytown USA</p>
                      </div>
                    </Card.Footer>
                  )}
                </Card>
              </div>
            </div>
          </div>
          <div className={`col-md-4 ${styles.orderSummary}`}>
            <Card
              className={styles.cardBody}
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <p className={styles.cardSubText}>Items Total: {itemsTotal}</p>
                <hr style={{ opacity: "0.1" }} />
                <p className={styles.cardSubText}>
                  Subtotal: <span style={{ float: "right" }}>${subtotal}</span>
                </p>
                <p className={styles.cardSubText}>
                  Shipping Price:{" "}
                  <span style={{ float: "right" }}>${shippingPrice}</span>
                </p>
                <hr style={{ opacity: "0.1" }} />
                <h4 className={styles.cardSubText}>
                  Total: <span style={{ float: "right" }}>${total}</span>
                </h4>
                <Button variant="success" style={{ width: "100%" }}>
                  Proceed to checkout
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <h4 className="text-center">No items in the cart</h4>
      )}
    </div>
  );
};

export default Cart;
