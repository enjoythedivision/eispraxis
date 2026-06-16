import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./Customer.scss";
import { customers } from "../../../data/customers";
import PaymentGrid from "./PaymentGrid.jsx";

export default function Customer() {
  const { id } = useParams();

  const initialCustomer = customers.find(
    (c) => c.id === Number(id)
  );

  const [customer, setCustomer] = useState(initialCustomer);

  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  function handleToggle(month) {
    setCustomer((prev) => ({
      ...prev,
      payments: {
        ...prev.payments,
        [month]: !prev.payments[month],
      },
    }));
  }

  return (
    <div className="customer">
      <div className="customer__header">
        <Link to="/">← Back to customer list</Link>
        <h1>{customer.name}</h1>
      </div>

      <div className="customer__sheet">
        <div className="customer__notes" />

        <div className="sheet__title">
          <h2>Payment Tracker</h2>

          <span className="status__badges">
            <span>
              <span className="complete"></span> Complete
            </span>
            <span>
              <span className="incomplete"></span> Pending
            </span>
            <span>
              <span className="na"></span> N/A
            </span>
          </span>
        </div>

        <div className="sheet__grid">
          <PaymentGrid
            customer={customer}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
}