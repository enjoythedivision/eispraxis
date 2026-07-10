import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNewCustomer() {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;
    if (!fee) return;

    await fetch("http://localhost:5021/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        monthlyFee: Number(fee),
      }),
    });

    setName("");
    setFee("");

    navigate("/");
  }

  return (
    <div className="customer-form">
      <h1>Add New Customer</h1>

      <form onSubmit={handleSubmit}>
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
          Add Customer
        </button>
      </form>
    </div>
  );
}
