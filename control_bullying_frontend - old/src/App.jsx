import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Si NO hay token → ir a Login */}
        <Route 
          path="/" 
          element={!token ? <Login /> : <Navigate to="/dashboard" />} 
        />

        {/* Si hay token → mostrar Dashboard */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
