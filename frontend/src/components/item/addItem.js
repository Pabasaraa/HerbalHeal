import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles/addItem.module.css";

const AddItem = () => {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    itemName: "",
    itemDescription: "",
    itemPrice: "",
  });
  const [itemImages, setItemImages] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:8000/items/new", formData)
      .then(() => {
        alert("Add item successful!");
        navigate("/login");
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
                      id="userId"
                      className="form-control"
                      placeholder="User ID"
                      name="userId"
                      value={formData.userId}
                      onChange={handleInputChange}
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="itemName"
                      className="form-control"
                      placeholder="Item Name"
                      name="itemName"
                      value={formData.itemName}
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
                      value={formData.itemDescription}
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
                      value={formData.itemPrice}
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
                      value={itemImages}
                      onChange={(e) => setItemImages(e.target.files[0])}
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

                  <div className="d-flex align-items-center justify-content-center pb-4">
                   
                    <button
                      className={styles.clickableText}
                      onClick={() => navigate("/login")}
                    >
                     Item List
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AddItem;
