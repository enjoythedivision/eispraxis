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
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(setCustomers)
      .catch(() =>
        setError(
          "Could not load the dashboard. Please check the server and reload.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const getPaidPayment = (customer) =>
    customer.payments?.find(
      (p) => p.year === year && p.month === month && p.isPaid,
    );

  function getMonthAmount(customer) {
    const payment = getPaidPayment(customer);
    return payment ? payment.paidFee : customer.monthlyFee;
  }

  const paid = customers.filter((customer) => getPaidPayment(customer));
  const unpaid = customers.filter((customer) => !getPaidPayment(customer));
  const hasUnknownAmounts = paid.some((customer) => getMonthAmount(customer) == null);
  const expected = customers.reduce((sum, c) => sum + (getMonthAmount(c) ?? 0), 0);
  const received = paid.reduce((sum, c) => sum + (getMonthAmount(c) ?? 0), 0);
  const rate = expected ? Math.round((received / expected) * 100) : 0;

  return (
    <div>
      <Link className="back-link" to="/">
        ← Back to customers
      </Link>
      <header className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p className="page-description">
            {now.toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </header>
      {loading ? (
        <p className="empty-state">Loading accounts…</p>
      ) : error ? (
        <p className="empty-state" role="alert">
          {error}
        </p>
      ) : (
        <>
          {hasUnknownAmounts && (
            <p role="status">Some older paid amounts were not recorded and are excluded from the money totals.</p>
          )}
          <div className={styles.metrics}>
            <div>
              <p>Money collected</p>
              <strong>€{received.toFixed(2)}</strong>
              <small>of €{expected.toFixed(2)} expected</small>
            </div>
            <div>
              <p>Collection rate</p>
              <strong>{rate}%</strong>
              <progress aria-label="Collection rate" max="100" value={rate} />
            </div>
            <div>
              <p>Accounts paid</p>
              <strong>
                {paid.length}
                <span> / {customers.length}</span>
              </strong>
              <small>{unpaid.length} awaiting payment</small>
            </div>
          </div>
          <div className={styles.registers}>
            {[
              [unpaid, "Awaiting payment"],
              [paid, "Paid this month"],
            ].map(([list, title]) => (
              <section key={title}>
                <div className={styles.sectionHeading}>
                  <h2>{title}</h2>
                  <span>{list.length}</span>
                </div>
                {list.length ? (
                  list.map((c) => (
                    <Link
                      className={styles.row}
                      key={c.id}
                      to={`/customer/${c.id}`}
                    >
                      <span>{c.name}</span>
                      <span>{getMonthAmount(c) == null ? "Amount not recorded" : `€${Number(getMonthAmount(c)).toFixed(2)}`} ↗</span>
                    </Link>
                  ))
                ) : (
                  <p className="empty-state">
                    {customers.length
                      ? "No accounts in this group."
                      : "Add a customer to start tracking payments."}
                  </p>
                )}
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
