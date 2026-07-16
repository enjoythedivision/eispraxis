import { useEffect, useState } from "react";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    async function fetchUnpaidCustomers() {
      const response = await fetch(
        `http://localhost:5021/api/dashboard/unpaid?year=${currentYear}&month=${currentMonth}`,
      );

      const data = await response.json();

      setCustomers(data);
    }

    fetchUnpaidCustomers();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Unpaid Customers</h2>

      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - €{customer.monthlyFee}
          </li>
        ))}
      </ul>
    </div>
  );
}