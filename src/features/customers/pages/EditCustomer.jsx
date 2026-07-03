import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCustomer({ customers, onEditCustomer }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = customers.find((c) => c.id === Number(id));

  const [name, setName] = useState(customer?.name || "");
  const [fee, setFee] = useState(customer?.monthlyFee || "");

  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  function handleEdit(e) {
    e.preventDefault();

    if (!name.trim()) return;
    if (!fee) return;

    onEditCustomer(customer.id, name.trim(), Number(fee));

    navigate(`/customer/${customer.id}`);
  }

  return (
    <div className="customer-form">
      <h1>Edit Customer Details</h1>

      <form onSubmit={handleEdit}>
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter customer name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fee">Monthly Fee</label>
          <input
            id="fee"
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            placeholder="Enter customer fee"
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
