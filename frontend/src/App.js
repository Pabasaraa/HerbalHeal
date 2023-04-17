import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/common/Header";

import Login from "./components/user/user.login";
import Register from "./components/user/user.register";
import Profile from "./components/user/user.profile";
import SellerProfile from "./components/user/seller.profile";
import AddItem from "./components/item/addItem";

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
          <Route path="/addItem" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
