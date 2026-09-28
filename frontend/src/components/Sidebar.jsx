import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar__logo">eispraxis<span>Customer accounts</span></NavLink>

      <nav className="sidebar__nav">
        <NavLink to="/" end className="sidebar__link">Customers</NavLink>
        <NavLink to="/dashboard" className="sidebar__link">Dashboard</NavLink>
        <NavLink to="/add-new" className="sidebar__link">+ Add customer</NavLink>
      </nav>
    </aside>
  );
}
