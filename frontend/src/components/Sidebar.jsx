import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

function NavIcon({ type }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === "customers" ? <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M21 20v-2a6 6 0 0 0-3-5" /></> :
      type === "dashboard" ? <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></> :
      <path d="M12 5v14M5 12h14" />}
  </svg>;
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  function closeMenu() { setOpen(false); }
  function handleKeyDown(event) {
    if (event.key === "Escape" && open) {
      closeMenu();
      toggle.current?.focus();
    }
  }
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`} onKeyDown={handleKeyDown}>
      <div className="sidebar__heading">
        <NavLink to="/" className="sidebar__logo" aria-label="Eispraxis home" onClick={closeMenu}>
          <span className="sidebar__wordmark">eispraxis</span><span className="sidebar__monogram" aria-hidden="true">e.</span>
          <span className="sidebar__subtitle">Customer accounts</span>
        </NavLink>
        <button ref={toggle} type="button" className="sidebar__toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <nav id="main-navigation" className="sidebar__nav" aria-label="Main navigation">
        <NavLink to="/" end className="sidebar__link" onClick={closeMenu}><NavIcon type="customers" /><span>Customers</span></NavLink>
        <NavLink to="/dashboard" className="sidebar__link" onClick={closeMenu}><NavIcon type="dashboard" /><span>Dashboard</span></NavLink>
        <NavLink to="/add-new" className="sidebar__link sidebar__add" onClick={closeMenu}><NavIcon type="add" /><span>Add customer</span></NavLink>
      </nav>
    </aside>
  );
}
