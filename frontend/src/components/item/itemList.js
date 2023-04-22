import axios from "axios";
import React, { Component } from "react";

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    console.log("runningg");
    const token = localStorage.getItem("token");
    this.retrieveItems(token);
  }

  retrieveItems(token) {
    axios
      .get(`http://localhost:8000/items/user/get`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data) {
          this.setState({ items: res.data.data });
        }
      });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/items/delete/:id/${id}`).then((res) => {
      alert("Delete Successfully");
      const userId = localStorage.getItem("userId");
      this.retrieveItems(userId);
    });
  };

  filterData(items, searchKey) {
    const result = items.filter(
      (items) =>
        items.name.toLowerCase().includes(searchKey) ||
        items.email.toLowerCase().includes(searchKey)
    );

    this.setState({ items: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/items/search").then((res) => {
      if (res.data) {
        this.filterData(res.data, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <u>
          <h2 className="h-tag">
            <i class="fa-solid fa-list"></i> List of items
          </h2>
        </u>

        <div class="Search-bar">
          <form class="Search-form">
            <input
              class="Input-data"
              type="search"
              placeholder="Search"
              name="searchQuery"
              aria-label="Search"
              onChange={this.handleSearchArea}
            />
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">userId</th>
              <th scope="col">username</th>
              <th scope="col">itemName</th>
              <th scope="col">itemDescription</th>
              <th scope="col">itemPrice</th>
              <th scope="col">itemImages</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items &&
              this.state.items.map((items, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{items.userId}</td>
                  <td>{items.username}</td>
                  <td>{items.itemName}</td>
                  <td>
                    {" "}
                    {items.itemDescription.length > 100
                      ? items.itemDescription.slice(0, 100) + "..."
                      : items.itemDescription}
                  </td>
                  <td>{items.itemPrice}</td>

                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/updateAdmin/${items._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp; Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(items._id)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp; Delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ItemList;
