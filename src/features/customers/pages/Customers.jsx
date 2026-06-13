import { customers } from "../../../data/customers";

export default function Customers() {
  return (
    <div>
      <h1>Κατάλογος</h1>

      {customers.map(c => (
        <div key={c.id}>
          <p>{c.name}</p>
        </div>
      ))}
    </div>
  );
}