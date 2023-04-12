import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/user/user.login";
import Register from "./components/user/user.register";
import Profile from "./components/user/user.profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
