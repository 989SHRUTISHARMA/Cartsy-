import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wishlist from "./components/Wishlist";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OrderSuccess from "./components/OrderSuccess";
import "./App.css";

import { Toaster } from "react-hot-toast";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>

      <Navbar
        setSearch={setSearch}
        setCategory={setCategory}
        category={category}
        user={user}
      />

      {/* ✅ ALL ROUTES MUST BE INSIDE THIS */}
      <Routes>

        <Route
          path="/"
          element={<ProductList search={search} category={category} />}
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />

        {/* ✅ FIXED PLACE */}
        <Route path="/order-success" element={<OrderSuccess />} />

      </Routes>

      <Footer />

      <Toaster position="top-right" />

    </BrowserRouter>
  );
}

export default App;