import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
// import logo from "../assets/images/logo cartsy.jpg";
// import logo from "../assets/images/cartsy-logo (5).png";
import logo from "../assets/images/cartsy-logo.png";

function Navbar() {
  const items = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="navbar">

      {/* Logo clickable */}
      <Link to="/">
        <img src={logo} alt="Cartsy Logo" className="logo-img" />
      </Link>

      {/* Search */}
      <input
        type="text"
        placeholder="Search gifts..."
        className="search-bar"
      />

      {/* Icons */}
      <div className="nav-icons">

        {/* Wishlist */}
        <Link to="/wishlist" className="icon cart-icon">
          <FaHeart />
          <span className="cart-count">{wishlistItems.length}</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="icon cart-icon">
          <FaShoppingCart />
          <span className="cart-count">{totalQuantity}</span>
        </Link>

        {/* Profile */}
        <Link to="/profile" className="icon">
          <FaUser />
        </Link>

      </div>
    </div>
  );
}

export default Navbar;