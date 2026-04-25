import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../features/CartSlice";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // 🔥 Coupon data (advanced)
  const coupons = [
    { code: "FLAT10", type: "percent", value: 10, min: 500, max: 200 },
    { code: "SAVE100", type: "flat", value: 100, min: 800 },
    { code: "SALE20", type: "percent", value: 20, min: 1000, max: 300 },
  ];

  // 🔥 MRP
  const mrp = items.reduce(
    (sum, item) => sum + item.price * item.quantity * 83,
    0
  );

  const productDiscount = mrp * 0.2;
  const subtotal = mrp - productDiscount;
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + delivery - discount;

  // 🎟️ Apply Coupon (SMART)
  const applyCoupon = (code) => {
    const c = code || coupon;
    const found = coupons.find((cp) => cp.code === c);

    if (!found) {
      toast.error("Invalid Coupon ❌");
      return;
    }

    // 👉 check used coupons
    const used = JSON.parse(localStorage.getItem("usedCoupons")) || [];

    if (used.includes(found.code)) {
      toast.error("Coupon already used ❌");
      return;
    }

    // 👉 min order check
    if (subtotal < found.min) {
      toast.error(`Min ₹${found.min} required ❌`);
      return;
    }

    let discountValue = 0;

    if (found.type === "percent") {
      discountValue = (subtotal * found.value) / 100;

      if (found.max) {
        discountValue = Math.min(discountValue, found.max);
      }
    } else {
      discountValue = found.value;
    }

    setDiscount(discountValue);

    // 👉 mark used
    localStorage.setItem(
      "usedCoupons",
      JSON.stringify([...used, found.code])
    );

    toast.success(`${found.code} applied 🎉`);
    setCoupon(c);
  };

  // 💳 Dummy payment
  const handlePayment = () => {
    if (items.length === 0) {
      toast.error("Cart is empty ❌");
      return;
    }

    toast.info("Processing payment... ⏳");

    setTimeout(() => {
      const orderId = "ORD" + Date.now();
      toast.success(`🎉 Order ${orderId} placed successfully!`);
      dispatch(clearCart());
    }, 1500);
  };

  return (
    <div className="cart-container">

      {/* LEFT */}
      <div className="cart-left">
        <h2>My Cart 🛒</h2>

        {items.length === 0 && <p>Your cart is empty 😢</p>}

        {items.map((item) => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="cart-details">
              <h3>{item.title}</h3>

              <p>
                ₹{(item.price * 83 * 0.8).toFixed(0)}
                <span style={{
                  textDecoration: "line-through",
                  marginLeft: "10px",
                  color: "#888"
                }}>
                  ₹{(item.price * 83).toFixed(0)}
                </span>
              </p>

              <div className="qty">
                <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
              </div>
            </div>

            <button
              className="remove"
              onClick={() => {
                dispatch(removeFromCart(item.id));
                toast.info("Removed from cart");
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      {items.length > 0 && (
        <div className="cart-right">

          <h3>Price Details</h3>

          <div className="summary-row">
            <span>MRP</span>
            <span>₹{mrp.toFixed(0)}</span>
          </div>

          <div className="summary-row">
            <span>Product Discount</span>
            <span style={{ color: "green" }}>
              -₹{productDiscount.toFixed(0)}
            </span>
          </div>

          <div className="summary-row">
            <span>Coupon Discount</span>
            <span style={{ color: "green" }}>
              -₹{discount.toFixed(0)}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          {/* 🎟️ Input */}
          <div style={{ marginTop: "10px" }}>
            <input
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button onClick={() => applyCoupon()}>Apply</button>
          </div>

          {/* 🔥 Coupon UI */}
          <div style={{ marginTop: "15px" }}>
            <p><b>Available Coupons:</b></p>

            {coupons.map((c) => (
              <div
                key={c.code}
                className="coupon-box"
                onClick={() => applyCoupon(c.code)}
              >
                {c.code} - 
                {c.type === "percent"
                  ? `${c.value}% OFF`
                  : `₹${c.value} OFF`}
                <br />
                <small>Min ₹{c.min}</small>
              </div>
            ))}
          </div>

          {/* Payment */}
          <button className="checkout" onClick={handlePayment}>
            Place Order
          </button>

          <button
            className="clear"
            onClick={() => {
              dispatch(clearCart());
              toast.success("Cart Cleared");
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}