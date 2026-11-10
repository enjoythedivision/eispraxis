import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return <div className="customer-form"><Link className="back-link" to={`/customer/${id}`}>← Back to customer</Link><h1>Loading...</h1></div>;
  }

  async function handleEdit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) return;
    if (!fee) return;

    try {
      const response = await fetch(`http://localhost:5021/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          monthlyFee: Number(fee),
        }),
      });

      if (!response.ok) {
        setError("Could not save the changes. Please try again.");
        return;
      }

      navigate(`/customer/${id}`);
    } catch {
      setError("Could not connect to the server. Please try again.");
    }
  }

  return (
    <div className="customer-form">
      <Link className="back-link" to={`/customer/${id}`}>← Back to customer</Link>
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

        {error && <p role="alert">{error}</p>}

        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
