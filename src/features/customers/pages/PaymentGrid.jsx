import PaymentCard from "./PaymentCard";
import "./PaymentGrid.scss";

const months = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

export default function PaymentGrid({ customer }) {
  if (!customer) return null;

  return (
    <div className="payment-grid">
      {months.map((month) => (
        <PaymentCard
          key={month}
          month={month}
          amount={customer.monthlyFee}
        />
      ))}
    </div>
  );
}