import { useState } from "react";

export default function AddNewCustomer({ onAddCustomer }) {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddCustomer(name, fee);

    setName("");
    setFee("");
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