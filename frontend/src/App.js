import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/user/user.login";
import Register from "./components/user/user.register";

function App() {
  return (
    <Router>
      <div className="App"></div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
