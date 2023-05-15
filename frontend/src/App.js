import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";

import Header from "./components/common/Header";
import Home from "./components/home/home";

import Login from "./components/user/user.login";
import Register from "./components/user/user.register";
import Profile from "./components/user/user.profile";
import SellerProfile from "./components/user/seller.profile";

import AddItems from "./components/product/add.items.js";
import ListItems from "./components/product/list.items.js";
import UpdateItems from "./components/product/update.items.js";
import ProductsList from "./components/product/products.list.js";
import ProductSingle from "./components/product/products.single.js";

import Cart from "./components/cart/cart.page";

import AdminHome from "./components/admin/admin.home";

import Checkout from "./components/payment/checkout.page";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellers/:id" element={<SellerProfile />} />

          <Route path="/dashboard/products/new" element={<AddItems />} />
          <Route path="/dashboard/products" element={<ListItems />} />
          <Route path="/dashboard/:id" element={<UpdateItems />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductSingle />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/admin" element={<AdminHome />} />

          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
