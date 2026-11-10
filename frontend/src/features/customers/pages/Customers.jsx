import { useEffect, useState } from "react";
import "./Customers.scss";
import { Link, useSearchParams } from "react-router-dom";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loadedStatus, setLoadedStatus] = useState(null);
  const [error, setError] = useState("");
  const [restoringCustomerId, setRestoringCustomerId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const showArchived = searchParams.get("archived") === "true";
  const loading = loadedStatus !== showArchived;

  useEffect(() => {
    // Ignore an old response if the user switches lists before it arrives.
    let ignore = false;

    async function loadCustomers() {
      try {
        const response = await fetch(
          `http://localhost:5021/api/customers?archived=${showArchived}`,
        );

        if (!response.ok) throw new Error("Customers could not be loaded");

        const data = await response.json();
        if (!ignore) {
          setCustomers(data);
          setError("");
        }
      } catch {
        if (!ignore) setError("Could not load customers. Please reload the page.");
      } finally {
        if (!ignore) setLoadedStatus(showArchived);
      }
    }

    loadCustomers();
    return () => { ignore = true; };
  }, [showArchived]);

  function handleStatusChange(event) {
    setLoadedStatus(null);
    setError("");
    setCustomers([]);
    setSearchParams(event.target.value === "archived" ? { archived: "true" } : {});
  }

  async function handleRestore(id) {
    setRestoringCustomerId(id);
    setError("");

    try {
      const response = await fetch(`http://localhost:5021/api/customers/${id}/restore`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Customer could not be restored");

      setCustomers((current) => current.filter((customer) => customer.id !== id || !customer.isArchived));
    } catch {
      setError("Could not restore the customer. Please try again.");
    } finally {
      setRestoringCustomerId(null);
    }
  }

  const filteredCustomers = customers.filter((c) =>
    c.isArchived === showArchived &&
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="customers">
      <Link className="back-link" to="/dashboard">← Back to dashboard</Link>
      <div className="customers__header">
        <div><h1>Customers</h1><p className="page-description">Customer details, notes, and monthly payments.</p></div>

        <div className="customers__controls">
        <Link to="/add-new" className="btn btn-primary">+ Add customer</Link>
        <select
          aria-label="Customer status"
          value={showArchived ? "archived" : "active"}
          onChange={handleStatusChange}
          disabled={restoringCustomerId !== null}
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        <input
          type="text"
          aria-label="Search customers"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="customers__search"
        />
        </div>
      </div>

      {error && <p role="alert">{error}</p>}

      <div className="customers__list" aria-busy={loading}>
        <div className="customers__columns"><span>Customer</span><span>Monthly fee</span></div>
        {loading && <p className="empty-state">Loading customers…</p>}
        {!loading && filteredCustomers.length === 0 && !error && (
          <p className="empty-state">No {showArchived ? "archived" : "active"} customers found.</p>
        )}
        {!loading && filteredCustomers.map((c) => (
          <div key={c.id} className="customer-card">
            <Link to={`/customer/${c.id}`}>
              {" "}
              <div className="customer-card__name">{c.name}</div>
              <div className="customer-card__meta">€{Number(c.monthlyFee).toFixed(2)} <span aria-hidden="true">↗</span></div>
            </Link>
            {showArchived && (
              <button
                type="button"
                className="btn btn-secondary customer-card__restore"
                aria-label={`Restore ${c.name}`}
                disabled={restoringCustomerId !== null}
                onClick={() => handleRestore(c.id)}
              >
                {restoringCustomerId === c.id ? "Restoring…" : "Restore"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
