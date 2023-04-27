import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateItems = () => {
  const [itemData, setItemData] = useState({});
  const [images, setImages] = useState([]);

  const navigate = useNavigate("");
  const params = useParams();

  const getdata = async () => {
    const res = await axios.get(`http://localhost:8000/items/${params.id}`);

    setItemData(res.data.data);
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const updateItem = async (e) => {
    e.preventDefault();

    console.log(itemData);

    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
    formData.append("itemName", itemData.itemName);
    formData.append("itemDescription", itemData.itemDescription);
    formData.append("itemPrice", itemData.itemPrice);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    await axios
      .put(`http://localhost:8000/items/update/${params.id}`, formData)
      .then((res) => {
        console.log(res);
        alert("Item Updated Successfully");
        navigate("/dashboard/products");
      })
      .catch((err) => {
        console.log(err);
        alert("Item Update Failed. Check console for more details");
      });
  };

  return (
    <div className="container">
      <h2 className="h-tag">
        <i class="fa-solid fa-pen-to-square"></i> Update Item details
      </h2>
      <div className="input-form">
        <form className="forms" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}> Username :</label>&nbsp;
            <br></br>
            <input
              type="text"
              className="inputcell"
              name="username"
              placeholder="Enter Username"
              defaultValue={itemData.username}
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Item Name :</label>&nbsp;
            <br></br>
            <input
              type="text"
              className="inputcell"
              name="itemName"
              placeholder="Enter Item Name"
              defaultValue={itemData.itemName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Item Description :</label>
            &nbsp;<br></br>
            <input
              type="text"
              className="inputcell"
              name="itemDescription"
              placeholder="Enter Item Description"
              defaultValue={itemData.itemDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}> itemPrice :</label>&nbsp;
            <br></br>
            <input
              type="text"
              className="inputcell"
              name="itemPrice"
              placeholder="Enter itemPrice"
              defaultValue={itemData.itemPrice}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Item Images :</label>&nbsp;
            <br></br>
            <input
              type="file"
              className="inputcell"
              name="itemImages"
              placeholder="Enter Item Images"
              onChange={handleImageChange}
            />
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={updateItem}
          >
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItems;
