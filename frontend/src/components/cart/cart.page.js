import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
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
              className={styles.product}
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
                        <Card.Text>{`Price: ${product.itemPrice} LKR`}</Card.Text>
                      </Col>
                      <Col xs={6} md={4}>
                        <Card.Text
                          style={{
                            width: "fit-content",
                            margin: "0 auto",
                          }}
                        >{`Qty: ${product.itemQuantity}`}</Card.Text>
                      </Col>
                      <Col xs={12} md={4}>
                        <Card.Text
                          style={{ width: "fit-content", float: "right" }}
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
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={shippingDetails.name}
            onChange={handleShippingDetailsChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleShippingDetailsChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={shippingDetails.city}
            onChange={handleShippingDetailsChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={shippingDetails.state}
            onChange={handleShippingDetailsChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={shippingDetails.zip}
            onChange={handleShippingDetailsChange}
            required
          />
        </Form.Group>
      </Form>
    );
  };

  return (
    <div className="container">
      {cartItems.length !== 0 ? (
        <div className="row">
          <h3 className="mt-3">
            <b>Shopping Cart</b>
          </h3>
          <hr style={{ opacity: "0.15" }} className="mt-2 mb-5" />
          <div className={`col-md-8 ${styles.cart}`}>
            {renderProducts()}
            <div className={styles.shippingEstimates}>
              <h4>
                <b>Shipping Estimates</b>
              </h4>
              <hr style={{ opacity: "0.15" }} className="mt-3 mb-5" />
              <div className="d-flex flex-column">
                <Card
                  className={`mb-3 ${
                    shippingMethod === "home_delivery" ? "bg-light" : ""
                  }`}
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
                    <Card.Footer>{renderShippingDetailsForm()}</Card.Footer>
                  )}
                </Card>

                <Card
                  className={`mb-3 ${
                    shippingMethod === "store_pickup" ? "bg-light" : ""
                  }`}
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
                    <Card.Footer>
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
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <p>Items Total: {itemsTotal}</p>
                <hr />
                <p>Subtotal: ${subtotal}</p>
                <p>Shipping Price: ${shippingPrice}</p>
                <hr />
                <h4>Total: ${total}</h4>
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
