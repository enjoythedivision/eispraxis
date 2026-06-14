import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__logo">Eispraxis</h2>

      <nav className="sidebar__nav">
        <Link to="/" className="sidebar__link">Customers</Link>
        <Link to="/dashboard" className="sidebar__link">Dashboard</Link>
        <Link to="/" className="sidebar__link">+ Add new</Link>
      </nav>
    </aside>
  );
}