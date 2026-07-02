import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Customers from "./features/customers/pages/Customers";
import Customer from "./features/customers/pages/Customer";
import AddNewCustomer from "./features/customers/pages/AddNewCustomer";

import { customers as initialCustomers } from "./data/customers";

export default function App() {
  const [customers, setCustomers] = useState(initialCustomers);
  const defaultPayments = {
    January: true,
    February: true,
    March: true,
    April: true,
    May: true,
    June: true,
    July: true,
    August: true,
    September: true,
    October: true,
    November: true,
    December: true,
  };

  function handleAddCustomer(name, fee) {
    const newCustomer = {
      id: Date.now(),
      name: name,
      monthlyFee: fee,
      payments: { ...defaultPayments },
    };

    setCustomers((prev) => [...prev, newCustomer]);
  }

  function handleDeleteCustomer(id) {
    setCustomers((prev) => {
      return prev.filter((c) => c.id !== id);
    })
  }

  function handleEditCustomer(id, newName, newFee) {
   setCustomers((prev) => {
     return prev.map((c) => {
       c.id === id ? {...c, name: newName, monthlyFee: newFee,} : c;
     })
     
   })
  }

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Customers customers={customers} />} />

          <Route
            path="/customer/:id"
            element={<Customer customers={customers} />}
          />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/add-new"
            element={<AddNewCustomer onAddCustomer={handleAddCustomer} onEditCustomer={handleEditCustomer} onDeleteCustomer={handleDeleteCustomer} />}
          />
        </Routes>
      </main>
    </div>
  );
}
