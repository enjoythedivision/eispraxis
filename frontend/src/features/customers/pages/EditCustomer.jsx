import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      const response = await fetch(`http://localhost:5021/api/customers/${id}`);

      const customer = await response.json();

      setName(customer.name);
      setFee(customer.monthlyFee);
      setLoading(false);
    }

    loadCustomer();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  async function handleEdit(e) {
    e.preventDefault();

    if (!name.trim()) return;
    if (!fee) return;

    await fetch(`http://localhost:5021/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        monthlyFee: Number(fee),
      }),
    });

    navigate(`/customer/${id}`);
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
