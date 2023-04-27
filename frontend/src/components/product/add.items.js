import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles/addItem.module.css";

const AddItems = () => {
  const [itemData, setItemData] = useState({});
  const [images, setImages] = useState([]);

  const validateUser = async () => {
    if (!localStorage.getItem("token")) {
      alert("You must login first!");
      navigate(`/login?redirect=${window.location.pathname}`);
    } else {
      const response = await axios.post(
        "http://localhost:8000/users/validatetoken",
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.data.data) {
        setItemData({
          ...itemData,
          username: response.data.data.username,
        });
      }

      if (response.data.data.role !== "seller") {
        alert("You must be a seller to add items!");
        navigate(`/products`);
      }
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(itemData);
    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
    formData.append("itemName", itemData.itemName);
    formData.append("itemDescription", itemData.itemDescription);
    formData.append("itemPrice", itemData.itemPrice);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    axios
      .post("http://localhost:8000/items/new", formData)
      .then(() => {
        alert("Add item successful!");
        navigate("/products");
      })
      .catch((err) => {
        alert("Add item failed, " + err.response.data.message);
      });
  };

  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{
                borderRadius: "15px",
                borderColor: "white",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div className="card-body p-5 text-center">
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-3">Add Item</h2>
                  <hr className="mb-4" style={{ opacity: "0.15" }} />

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      value={itemData.username}
                      onChange={handleInputChange}
                      required
                      disabled
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="itemName"
                      className="form-control"
                      placeholder="Item Name"
                      name="itemName"
                      value={itemData.itemName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="itemDescription"
                      className="form-control"
                      placeholder="Item Description"
                      name="itemDescription"
                      value={itemData.itemDescription}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="itemPrice"
                      className="form-control"
                      placeholder="Item Price"
                      name="itemPrice"
                      value={itemData.itemPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="file"
                      id="itemImages"
                      className="form-control"
                      placeholder="Item Images"
                      name="itemImages"
                      onChange={handleImageChange}
                      required
                    />
                  </div>

                  <button
                    className={styles.btn_login}
                    style={{ marginTop: "15px", width: "fit-content" }}
                    type="submit"
                  >
                    Save
                  </button>

                  <hr className="my-4" style={{ opacity: "0.15" }} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AddItems;
