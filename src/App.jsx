import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashbaord from "./components/Dashbaord";
import Products from "./components/products";
import Users from "./components/users";
import Category from "./components/Category";
import Order from "./components/Order";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/" element={<Dashbaord />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/product" element={<Products />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/product/:id" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
