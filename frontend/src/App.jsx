import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Customers from "./features/customers/pages/Customers";
import Customer from "./features/customers/pages/Customer";
import AddNewCustomer from "./features/customers/pages/AddNewCustomer";
import EditCustomer from "./features/customers/pages/EditCustomer";

export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Customers />} />

          <Route
            path="/customer/:id"
            element={<Customer />}
          />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/customer/:id/edit"
            element={<EditCustomer />}
          />

          <Route
            path="/add-new"
            element={<AddNewCustomer />}
          />
        </Routes>
      </main>
    </div>
  );
}