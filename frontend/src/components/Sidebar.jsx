import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>MFS System</h3>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/applications">Applications</Link>
      <Link to="/new">New Application</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/rules">Rules</Link>
    </div>
  );
}
