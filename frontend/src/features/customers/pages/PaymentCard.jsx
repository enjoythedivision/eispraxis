import "./PaymentCard.scss";

export default function PaymentCard({ month, amount, paid, onToggle }) {
  return (
    <div className="payment-card">
      <div className="payment-card__top">
        <p className="payment-card__month">{month}</p>
        <button
          className={`payment-card__status ${
            paid
              ? "payment-card__status--complete"
              : "payment-card__status--pending"
          }`}
          onClick={() => onToggle(month)}
        >
          {paid ? "✓" : "✕"}
        </button>
      </div>

      <p className="payment-card__amount">
        <span>€</span>
        {amount}
      </p>

      <hr />

      <p className="payment-card__label">Payment Date</p>
      <p className="payment-card__date">Jan 12, 2025</p>
    </div>
  );
}
