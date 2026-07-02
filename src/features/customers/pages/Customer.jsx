import { Link, useParams } from "react-router-dom";
import "./Customer.scss";
import PaymentGrid from "./PaymentGrid.jsx";

export default function Customer({
  customers,
  onEditCustomer,
  onDeleteCustomer,
  onTogglePayment,
}) {
  const { id } = useParams();

  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  return (
    <div className="customer">
      <div className="customer__header">
        <Link to="/">← Back to customer list</Link>
        <h1>{customer.name}</h1>
        <Link to={`/customer/${customer.id}/edit`}>Edit</Link>
        <Link to=""></Link>
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
            onToggle={(month) => onTogglePayment(customer.id, month)}
          />{" "}
        </div>
      </div>
    </div>
  );
}
