import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";
export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  useEffect(() => {
    fetch("http://localhost:5021/api/customers")
      .then(response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(setCustomers)
      .catch(() => setError("Could not load the dashboard. Please check the server and reload."))
      .finally(() => setLoading(false));
  }, []);
  const isPaid = customer => customer.payments?.some(p => p.year === year && p.month === month && p.isPaid);
  const paid = customers.filter(isPaid);
  const unpaid = customers.filter(customer => !isPaid(customer));
  const expected = customers.reduce((sum, c) => sum + c.monthlyFee, 0);
  const received = paid.reduce((sum, c) => sum + c.monthlyFee, 0);
  const rate = expected ? Math.round(received / expected * 100) : 0;
  return <div className={styles.dashboard}>
    <header className="page-heading"><div><p className="eyebrow">Monthly overview</p><h1>Dashboard</h1><p className="page-description">{now.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p></div><Link to="/" className="btn btn-secondary">View customers ↗</Link></header>
    {loading ? <p className="empty-state">Loading accounts…</p> : error ? <p className="empty-state" role="alert">{error}</p> : <>
      <div className={styles.metrics}>
        <div><p>Money collected</p><strong>€{received.toFixed(2)}</strong><small>of €{expected.toFixed(2)} expected</small></div>
        <div><p>Collection rate</p><strong>{rate}%</strong><progress aria-label="Collection rate" max="100" value={rate} /></div>
        <div><p>Accounts paid</p><strong>{paid.length}<span> / {customers.length}</span></strong><small>{unpaid.length} awaiting payment</small></div>
      </div>
      <div className={styles.registers}>
        {[[unpaid, "Awaiting payment"], [paid, "Paid this month"]].map(([list, title]) => <section key={title}>
          <div className={styles.sectionHeading}><h2>{title}</h2><span>{list.length}</span></div>
          {list.length ? list.map(c => <Link className={styles.row} key={c.id} to={`/customer/${c.id}`}><span>{c.name}</span><span>€{Number(c.monthlyFee).toFixed(2)} ↗</span></Link>) : <p className="empty-state">{customers.length ? "No accounts in this group." : "Add a customer to start tracking payments."}</p>}
        </section>)}
      </div>
    </>}
  </div>;
}