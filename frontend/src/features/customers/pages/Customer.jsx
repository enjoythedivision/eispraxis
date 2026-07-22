import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Customer.scss";
import PaymentGrid from "./PaymentGrid.jsx";

export default function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear); //get current year + set state for current year
  const years = [];
  for (let year = 2025; year <= currentYear; year++) {
    years.push(year);
  }

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await fetch(
          `http://localhost:5021/api/customers/${id}`,
        );

        if (!response.ok) {
          setCustomer(null);
          return;
        }

        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    }

    async function fetchNotes() {
      const response = await fetch(
        `http://localhost:5021/api/customers/${id}/notes`,
      );
      const data = await response.json();
      setNotes(data);
    }

    fetchCustomer();
    fetchNotes();
  }, [id]);

  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:5021/api/customers/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        console.error("Failed to delete customer");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  async function handleTogglePayment(month) {
    const year = selectedYear;

    const response = await fetch(
      `http://localhost:5021/api/customers/${id}/payments/${year}/${month}`,
      {
        method: "PATCH",
      },
    );

    if (!response.ok) return;

    const updatedPayment = await response.json();

    setCustomer((current) => {
      const existingPayment = current.payments.find(
        (p) => p.year === year && p.month === month,
      );

      const payments = existingPayment
        ? current.payments.map((p) =>
            p.year === year && p.month === month ? updatedPayment : p,
          )
        : [...current.payments, updatedPayment];

      return {
        ...current,
        payments,
      };
    });
  }

  const handleDeleteNote = async (noteId) => {
    const response = await fetch(
      `http://localhost:5021/api/customers/${id}/notes/${noteId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      console.error("Failed to delete note");
      return;
    }

    setNotes((currentNotes) => currentNotes.filter((n) => n.id !== noteId));
  };

  return (
    <div className="customer">
      <div className="customer__header">
        <Link className="customer__back" to="/">
          ← Back to customer list
        </Link>

        <h1>{customer.name}</h1>

        <div className="customer__actions">
          <Link
            className="btn btn-secondary"
            to={`/customer/${customer.id}/edit`}
          >
            Edit
          </Link>

          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="customer__sheet">
        <div className="customer__notes">
          <Link to={`/customer/${customer.id}/addnote`}>Add note...</Link>
          {notes.map((n) => (
            <div key={n.id} className="note">
              {n.content}{" "}
              <button
                onClick={() => handleDeleteNote(n.id)}
                className="delete__note"
              >
                Delete note
              </button>
            </div>
          ))}
        </div>

        <div className="sheet__title">
          <h2>Payment Tracker</h2>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

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
            year={selectedYear}
            onToggle={handleTogglePayment}
          />
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal__content">
            <h2>Delete customer?</h2>
            <p>Are you sure you want to delete {customer.name}?</p>

            <div className="modal__actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
