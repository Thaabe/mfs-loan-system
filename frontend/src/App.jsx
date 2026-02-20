import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import NewApplication from "./pages/NewApplication";
import Reports from "./pages/Reports";
import RuleConfig from "./pages/RuleConfig";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="layout">
        <div className="main">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/new" element={<NewApplication />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/rules" element={<RuleConfig />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
