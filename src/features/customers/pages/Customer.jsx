import { Link, useParams } from "react-router-dom";
import "./Customer.scss";
import { customers } from "../../../data/customers";

export default function Customer() {
  const { id } = useParams();

  const customer = customers.find(
    (c) => c.id === Number(id)
  );

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
        €{customer.monthlyFee} / month
      </div>
    </div>
  );
}