import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Customers from "./features/customers/pages/Customers";
import Customer from "./features/customers/pages/Customer";
import AddNewCustomer from "./features/customers/pages/AddNewCustomer";


export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        {/* Main page routing */}
        <Routes> 
          <Route path="/" element={<Customers />} />
          <Route path="/customer/:id" element={<Customer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-new" element={<AddNewCustomer/>}></Route>
        </Routes>
      </main>
    </div>
  );
}