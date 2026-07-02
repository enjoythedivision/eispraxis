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
    <>
      <h1>Edit Customer Details</h1>

      <form onSubmit={handleEdit}>
        <label htmlFor="name">Customer Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter customer name"
        />

        <label htmlFor="fee">Monthly Fee</label>
        <input
          id="fee"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder="Enter customer fee"
        />

        <button type="submit">Edit Customer</button>
      </form>
    </>
  );
}