import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.scss";

import Customers from "./features/customers/pages/Customers";
import Customer from "./features/customers/pages/Customer";

function Dashboard() {
  return <h1>Dashboard</h1>;
}

export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Customers />} />
          <Route path="/customer/:id" element={<Customer />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}