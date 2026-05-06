import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import logo from "../assets/images/clogo.png";

function Navbar({ setSearch, setCategory, user }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("all");

  const items = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    setActive(cat);
  };

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

          {user ? (
            <div className="user-menu">
              <div className="user-icon" onClick={() => setOpen(!open)}>
                <FaUser />
              </div>

              {open && (
                <div className="dropdown">
                  <p>{user.email}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FaUser />
            </Link>
          )}
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="category-bar">
        <span className={active==="all"?"active":""} onClick={() => handleCategory("all")}>All</span>
        <span className={active==="beauty"?"active":""} onClick={() => handleCategory("beauty")}>Beauty</span>
        <span className={active==="fashion"?"active":""} onClick={() => handleCategory("fashion")}>Fashion</span>
        <span className={active==="electronics"?"active":""} onClick={() => handleCategory("electronics")}>Electronics</span>
        <span className={active==="home"?"active":""} onClick={() => handleCategory("home")}>Home</span>
        <span className={active==="food"?"active":""} onClick={() => handleCategory("food")}>Food</span>
      </div>
    </>
  );
}

export default Navbar;