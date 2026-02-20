import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>MFS Loan System</h2>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/new">New Application</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/rules">Rules</Link>
      </div>
    </nav>
  );
}
