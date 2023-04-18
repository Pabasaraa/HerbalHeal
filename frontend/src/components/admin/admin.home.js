import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./styles/adminHome.module.css";

const AdminHome = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      user: "John Doe",
      products: [
        { name: "Product 1", quantity: 2, price: 20 },
        { name: "Product 2", quantity: 1, price: 15 },
      ],
      total: 55,
      status: "pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      products: [
        { name: "Product 3", quantity: 1, price: 10 },
        { name: "Product 4", quantity: 3, price: 5 },
      ],
      total: 25,
      status: "pending",
    },
  ]);

  const handleAccept = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "accepted" } : order
      )
    );
  };

  const handleReject = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "rejected" } : order
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Order Review</h1>
      {orders.map((order) => (
        <Card key={order.id} className={styles.card}>
          <Card.Header className={styles.header}>
            <h3>Order #{order.id}</h3>
            <p>User: {order.user}</p>
          </Card.Header>
          <Card.Body>
            {order.products.map((product, index) => (
              <div key={index} className={styles.row}>
                <p>{product.name}</p>
                <p>Qty: {product.quantity}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
            <hr />
            <div className={styles.row}>
              <p>Total:</p>
              <p>${order.total}</p>
            </div>
            <div className={styles.row}>
              <p>Status:</p>
              <p className={styles[order.status]}>{order.status}</p>
            </div>
            <div className={styles.buttons}>
              <Button
                variant="success"
                className={styles.btn}
                onClick={() => handleAccept(order.id)}
                disabled={order.status !== "pending"}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                className={styles.btn}
                onClick={() => handleReject(order.id)}
                disabled={order.status !== "pending"}
              >
                Reject
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AdminHome;
