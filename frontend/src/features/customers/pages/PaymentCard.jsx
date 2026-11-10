import "./PaymentCard.scss";
export default function PaymentCard({ month, amount, paid, onToggle, paymentDate, disabled }) {
  return <div className={`payment-card ${paid ? "payment-card--paid" : ""}`}>
    <div className="payment-card__top">
      <p className="payment-card__month">{month}</p>
      <button className={`payment-card__status ${paid ? "payment-card__status--complete" : ""}`} aria-pressed={paid} aria-label={`${month}: ${paid ? "paid, mark as pending" : "pending, mark as paid"}`} disabled={disabled} onClick={onToggle}>{paid ? "✓ Paid" : "Pending"}</button>
    </div>
    <p className="payment-card__amount">{amount == null ? "Amount not recorded" : `€${Number(amount).toFixed(2)}`}</p>
    <p className="payment-card__date">{paid ? (paymentDate ? `Paid on ${new Date(paymentDate).toLocaleDateString("el-GR")}` : "Payment received") : "Awaiting payment"}</p>
  </div>;
}
