import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from "react-icons/fa";
import logo from "../assets/images/clogo.png";

function Navbar({ setSearch, setCategory }) {

  const items = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">

        <Link to="/">
          <img src={logo} className="logo-img" alt="logo" />
        </Link>

        {/* SEARCH */}
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ICONS */}
        <div className="nav-icons">

          <Link to="/wishlist">
            <FaHeart />
            <span>{wishlistItems.length}</span>
          </Link>

          <Link to="/cart">
            <FaShoppingCart />
            <span>{totalQuantity}</span>
          </Link>

          <Link to="/profile">
            <FaUser />
          </Link>

        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="category-bar">

     <div className="category-bar">
  <span onClick={() => setCategory("all")}>All</span>
  <span onClick={() => setCategory("beauty")}>Beauty</span>
  <span onClick={() => setCategory("fashion")}>Fashion</span>
  <span onClick={() => setCategory("electronics")}>Electronics</span>
  <span onClick={() => setCategory("home")}>Home</span>
</div> 

      </div>
    </>
  );
}

export default Navbar;