import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, Button } from "react-bootstrap";
import styles from "./styles/adminHome.module.css";

const AdminHome = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/orders");
        const allOrders = totalPrice(response.data.data);
        setOrders(allOrders);
        console.log(orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  // TODO: need to fix this it get the total of all the orders currently in the database
  const totalPrice = (fetchedOrders) => {
    let total = 0;
    fetchedOrders.map((order) => {
      order.orderedItems.map((item) => {
        total += item.itemPrice * item.itemQuantity;
        order.total = total;
      });
    });
    return fetchedOrders;
  };

  const handleAccept = (id) => {
    orders.map((order) => {
      if (order._id === id) {
        order.status = "Approved";
        axios
          .put(`http://localhost:8000/orders/${id}`, order)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: "Approved" } : order
          )
        );
      }
    });
  };

  const handleReject = (id) => {
    orders.map((order) => {
      if (order._id === id) {
        order.status = "Rejected";
        axios
          .put(`http://localhost:8000/orders/${id}`, order)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: "Rejected" } : order
          )
        );
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Review Orders</h1>
      <div style={{ maxWidth: "60%", margin: "0 auto" }}>
        {orders &&
          orders.map((order) => (
            <Card key={order._id} className={styles.card}>
              <Card.Header className={styles.header}>
                <h3>Order #{order._id}</h3>
                <p>User: {order.customerName}</p>
              </Card.Header>
              <Card.Body>
                {order.orderedItems.map((product, index) => (
                  <div key={index} className={styles.row}>
                    <div style={{ maxWidth: "400px" }}>
                      <p>{product.itemName}</p>
                    </div>
                    <div>
                      <p>
                        {product.itemQuantity} x {product.itemPrice}
                      </p>
                    </div>
                    <p>{product.itemPrice * product.itemQuantity} LKR</p>
                  </div>
                ))}
                <hr />
                <div className={styles.row}>
                  <p>Total:</p>
                  <p>{order.total} LKR</p>
                </div>
                <div className={styles.row}>
                  <p>Status:</p>
                  <p className={styles[order.status]}>{order.status}</p>
                </div>
                <div className={styles.buttons}>
                  <Button
                    variant="success"
                    className={styles.btn}
                    onClick={() => handleAccept(order._id)}
                    disabled={order.status !== "Processing"}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    className={styles.btn}
                    onClick={() => handleReject(order._id)}
                    disabled={order.status !== "Processing"}
                  >
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AdminHome;
