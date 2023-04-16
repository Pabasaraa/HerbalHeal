import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Header from "./components/common/Header";

import Login from "./components/user/user.login";
import Register from "./components/user/user.register";
import Profile from "./components/user/user.profile";
import SellerProfile from "./components/user/seller.profile";

import ProductsList from "./components/product/products.list.js";
import ProductSingle from "./components/product/products.single.js";


import Cart from "./components/cart/cart.page";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellers/:id" element={<SellerProfile />} />

          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductSingle />} />

          {/* chavi */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
