import { Link, useParams } from "react-router-dom";
import "./Customer.scss";
import { customers } from "../../../data/customers";

export default function Customer() {
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
      </div>
      <div className="customer__sheet">
        <div className="sheet__title">
          <h2>Payment Details</h2>
          <span className="status__badges">
            <span><span className="complete"></span> Complete</span>
            <span><span className="incomplete"></span> Not Complete</span>
            <span><span className="na"></span> N/A</span>
          </span>
        </div>
      </div>
    </div>
  );
}
