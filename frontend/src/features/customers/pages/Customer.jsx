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
  const [savingPayment, setSavingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear); //get current year + set state for current year
  const years = [];
  for (let year = 2024; year <= currentYear; year++) {
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
    return <><Link className="back-link" to="/">← Back to customers</Link><h1>Loading...</h1></>;
  }

  if (!customer) {
    return <><Link className="back-link" to="/">← Back to customers</Link><h1>Customer not found</h1></>;
  }

  async function handleSetPaymentStatus(month, isPaid) {
    const year = selectedYear;

    setSavingPayment(true);
    setPaymentError("");

    try {
      const response = await fetch(
        `http://localhost:5021/api/customers/${id}/payments/${year}/${month}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isPaid }),
        },
      );

      if (!response.ok) throw new Error("Payment was not saved");

      const updatedPayment = await response.json();

      setCustomer((current) => {
        if (current?.id !== updatedPayment.customerId) return current;

        const otherPayments = current.payments.filter(
          (p) => p.year !== year || p.month !== month,
        );

        return { ...current, payments: [...otherPayments, updatedPayment] };
      });
    } catch {
      setPaymentError("Could not save this month. Reload the page and try again.");
    } finally {
      setSavingPayment(false);
    }
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
        <Link className="customer__back" to={customer.isArchived ? "/?archived=true" : "/"}>
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

          {!customer.isArchived && <button
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Archive
          </button>}
        </div>
        <p className="customer__fee">€{Number(customer.monthlyFee).toFixed(2)} per month</p>
      </div>

      <div className="customer__sheet">
        <div className="customer__notes">
          <div className="notes__heading"><h2>Account notes</h2><Link to={`/customer/${customer.id}/addnote`}>+ Add note</Link></div>
          {notes.length === 0 && <p className="page-description">No notes on this account yet.</p>}
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
            aria-label="Payment year"
            disabled={savingPayment}
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
          </span>
        </div>

        <div className="sheet__grid">
          {paymentError && <p role="alert">{paymentError}</p>}
          <PaymentGrid
            customer={customer}
            year={selectedYear}
            onSetPaid={handleSetPaymentStatus}
            saving={savingPayment}
          />
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal__content">
            <h2>Archive customer?</h2>
            <p>Are you sure you want to archive {customer.name}?</p>

            <div className="modal__actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
