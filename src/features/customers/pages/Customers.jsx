import { useState } from "react";
import { customers as initialCustomers } from "../../../data/customers";
import "./Customers.scss";

export default function Customers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = initialCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customers">
      <div className="customers__header">
        <h1>Customers</h1>

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="customers__search"
        />
      </div>

      <div className="customers__list">
        {filteredCustomers.map((c) => (
          <div key={c.id} className="customer-card">
            <div className="customer-card__name">{c.name}</div>

            <div className="customer-card__meta">
              €{c.monthlyFee} / month
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}