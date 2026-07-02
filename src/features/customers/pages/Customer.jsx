import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Customer.scss";
import PaymentGrid from "./PaymentGrid.jsx";

export default function Customer({
  customers,
  onDeleteCustomer,
  onTogglePayment,
}) {
  const { id } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  return (
    <div className="customer">
      <div className="customer__header">
        <Link to="/">← Back to customer list</Link>
        <h1>{customer.name}</h1>
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

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    onDeleteCustomer(customer.id);
                    navigate("/");
                  }}
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="customer__sheet">
        <div className="customer__notes" />

        <div className="sheet__title">
          <h2>Payment Tracker</h2>

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
            onToggle={(month) => onTogglePayment(customer.id, month)}
          />
        </div>
      </div>
    </div>
  );
}
