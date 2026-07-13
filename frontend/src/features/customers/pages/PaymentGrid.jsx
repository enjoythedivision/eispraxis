import PaymentCard from "./PaymentCard";
import "./PaymentGrid.scss";

const months = [
  { number: 1, name: "January" },
  { number: 2, name: "February" },
  { number: 3, name: "March" },
  { number: 4, name: "April" },
  { number: 5, name: "May" },
  { number: 6, name: "June" },
  { number: 7, name: "July" },
  { number: 8, name: "August" },
  { number: 9, name: "September" },
  { number: 10, name: "October" },
  { number: 11, name: "November" },
  { number: 12, name: "December" },
];

export default function PaymentGrid({ customer, onToggle }) {
  if (!customer) return null;

  return (
    <div className="payment-grid">
      {months.map((month) => (
        <PaymentCard
          key={month.number}
          month={month.name}
          amount={customer.monthlyFee}
          paid={payment?.isPaid ?? false}
          onToggle={() => onToggle(month.number)}
        />
      ))}
    </div>
  );
}