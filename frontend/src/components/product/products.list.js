import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, FormControl, InputGroup, Badge } from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import axios from "axios";

import styles from "./styles/products.list.module.css";

import Loader from "../common/Spinner";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(null);
  const [imageBuffers, setImageBuffers] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/items/get/all")
      .then((res) => {
        setProducts(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (products) {
      const buffers = products.map((product) => product.itemImages[0].data);
      setImageBuffers(buffers);
    }
  }, [products]);

  useEffect(() => {
    const strings = imageBuffers.map((buffer) => {
      const binary = Array.from(new Uint8Array(buffer))
        .map((b) => String.fromCharCode(b))
        .join("");
      return `data:image/jpeg;base64,${btoa(binary)}`;
    });
    setBase64Strings(strings);
  }, [imageBuffers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchProducts = () => {
    axios
      .post("http://localhost:8000/items/search", {
        searchTerm: searchTerm,
      })
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className={styles.container} style={{ padding: "0 60px" }}>
        <InputGroup className={styles.searchBar}>
          <FormControl
            className={styles.searchInput}
            placeholder="Search products"
            aria-label="Search products"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            variant="outline-secondary"
            className={styles.searchBtn}
            onClick={searchProducts}
          >
            Search
          </Button>
        </InputGroup>
        <h5>All Products:</h5>
        <br />
        {products && base64Strings.length > 0 ? (
          <div className={styles.productGrid}>
            {products.map((product, key) => (
              <MDBCard
                key={product.id}
                onClick={() => navigate(`/products/${product._id}`)}
                style={{ cursor: "pointer" }}
                className={styles.productCard}
              >
                <MDBCardImage
                  src={base64Strings[key]}
                  position="top"
                  alt={product.itemName}
                  className={styles.productIms}
                />
                <MDBCardBody
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <hr className="mb-4" style={{ opacity: "0.15" }} />
                    <div className="d-flex justify-content-between mb-1">
                      <h5 className="mb-0">{product.itemName}</h5>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <p className="small text-muted mb-0">
                        By {product.username}
                      </p>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between mb-3 mt-1">
                    <div style={{ marginTop: "7px" }}>
                      <Badge class="text-muted mb-0" bg="success">
                        Available
                      </Badge>
                    </div>
                    <h3 className="text-dark mb-0">
                      {product.itemPrice}{" "}
                      <span style={{ fontSize: "0.9rem" }}>LKR</span>
                    </h3>
                  </div>
                </MDBCardBody>
              </MDBCard>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProductsList;
