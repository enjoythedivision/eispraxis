import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNewCustomer({ onAddCustomer }) {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;
    if (!fee) return;

    onAddCustomer(name.trim(), Number(fee));
    setName("");
    setFee("");

    navigate("/");
  }

  return (
    <div className="add-customer">
      <h1>Add New Customer</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}