import { useEffect, useState } from "react";
import "./Customers.scss";
import { Link } from "react-router-dom"

export default function Customers() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5021/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data));
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="customers">
      <div className="customers__header">
        <div><p className="eyebrow">Account register</p><h1>Customers</h1><p className="page-description">Customer details, notes, and monthly payments.</p></div>

        <input
          type="text"
          aria-label="Search customers"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="customers__search"
        />
      </div>

      <div className="customers__list">
        <div className="customers__columns"><span>Customer</span><span>Monthly fee</span></div>
        {filteredCustomers.map((c) => (
          <div key={c.id} className="customer-card">
            <Link to={`/customer/${c.id}`}>
              {" "}
              <div className="customer-card__name">{c.name}</div>
              <div className="customer-card__meta">€{Number(c.monthlyFee).toFixed(2)} <span aria-hidden="true">↗</span></div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
