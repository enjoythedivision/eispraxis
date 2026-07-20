import { useEffect, useState } from "react";

export default function Dashboard() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("http://localhost:5021/api/customers");
        const data = await response.json();
        console.log("Fetched customers:", data);
        setAllCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  // Calculate metrics
  const expectedRevenue = allCustomers.reduce(
    (sum, customer) => sum + customer.monthlyFee,
    0,
  );

  const { paid, unpaid, received } = allCustomers.reduce(
    (acc, customer) => {
      const isPaid = customer.payments?.some(
        (p) => p.year === currentYear && p.month === currentMonth && p.isPaid,
      );

      if (isPaid) {
        acc.paid++;
        acc.received += customer.monthlyFee;
      } else {
        acc.unpaid++;
      }

      return acc;
    },
    { paid: 0, unpaid: 0, received: 0 },
  );

  const collectionRate =
    expectedRevenue > 0 ? Math.round((received / expectedRevenue) * 100) : 0;
  const totalCustomers = allCustomers.length;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Money Collected</h2>
        <div>
          €{received.toFixed(2)} / €{expectedRevenue.toFixed(2)}
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Collection Rate</h2>
        <div>{collectionRate}%</div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Paid / Unpaid</h2>
        <div>
          <div>Paid: {paid}</div>
          <div>Unpaid: {unpaid}</div>
        </div>
      </div>

      <div>
        <h2>
          Unpaid Customers ({currentMonth}/{currentYear})
        </h2>
        {unpaid > 0 ? (
          <ul>
            {allCustomers
              .filter(
                (customer) =>
                  !customer.payments?.some(
                    (p) =>
                      p.year === currentYear &&
                      p.month === currentMonth &&
                      p.isPaid,
                  ),
              )
              .map((customer) => (
                <li key={customer.id}>
                  {customer.name} - €{customer.monthlyFee}
                </li>
              ))}
          </ul>
        ) : (
          <p>All customers have paid.</p>
        )}
      </div>

      <div>
        <h2>Paid Customers</h2>

        {paid > 0 ? (
          <ul>
            {allCustomers
              .filter((customer) =>
                customer.payments?.some(
                  (p) =>
                    p.year === currentYear &&
                    p.month === currentMonth &&
                    p.isPaid,
                ),
              )
              .map((customer) => (
                <li key={customer.id}>
                  {customer.name} - €{customer.monthlyFee}
                </li>
              ))}
          </ul>
        ) : (
          <p>No customers have paid yet.</p>
        )}
      </div>
    </div>
  );
}
