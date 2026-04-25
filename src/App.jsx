import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wishlist from "./components/Wishlist";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <BrowserRouter>

      {/* NAVBAR (controls search + category) */}
      <Navbar 
        setSearch={setSearch} 
        setCategory={setCategory}
        category={category}
      />

      {/* ROUTES */}
      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              search={search} 
              category={category} 
            />
          } 
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      <Footer />
      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;