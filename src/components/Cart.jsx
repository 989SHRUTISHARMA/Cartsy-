import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../features/CartSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // ================= COUPONS =================
  const coupons = [
    { code: "FLAT10", type: "percent", value: 10, min: 500, max: 200 },
    { code: "SAVE100", type: "flat", value: 100, min: 800 },
    { code: "SALE20", type: "percent", value: 20, min: 1000, max: 300 },
  ];

  // ================= PRICE CALC =================
  const mrp = items.reduce(
    (sum, item) => sum + item.price * item.quantity * 83,
    0
  );

  const productDiscount = mrp * 0.2;
  const subtotal = mrp - productDiscount;
  const delivery = subtotal > 500 ? 0 : 40;
  const totalSaving = productDiscount + discount;
  const total = subtotal + delivery - discount;

  // ================= APPLY COUPON =================
  const applyCoupon = () => {
    const found = coupons.find((c) => c.code === coupon);

    if (!found) {
      toast.error("Invalid Coupon ❌");
      return;
    }

    const used = JSON.parse(localStorage.getItem("usedCoupons")) || [];

    if (used.includes(found.code)) {
      toast.error("Coupon already used ❌");
      return;
    }

    if (subtotal < found.min) {
      toast.error(`Min ₹${found.min} required ❌`);
      return;
    }

    let discountValue = 0;

    if (found.type === "percent") {
      discountValue = (subtotal * found.value) / 100;
      if (found.max) discountValue = Math.min(discountValue, found.max);
    } else {
      discountValue = found.value;
    }

    setDiscount(discountValue);

    localStorage.setItem(
      "usedCoupons",
      JSON.stringify([...used, found.code])
    );

    toast.success("Coupon Applied 🎉");
  };

  // ================= PLACE ORDER =================
  const handlePayment = () => {
    if (items.length === 0) {
      toast.error("Cart is empty ❌");
      return;
    }

    toast.info("Processing order... ⏳");
setTimeout(() => {
  const orderId = "ORD" + Date.now();

  dispatch(clearCart());
  setDiscount(0);
  setCoupon("");

  // go to success page
  navigate("/order-success", {
    state: { orderId }
  });

}, 1500);
    
  };

  return (
    <div className="cart-container">

      {/* ================= LEFT SIDE ================= */}
      <div className="cart-left">
        <h2>🛒 My Cart</h2>

        {items.length === 0 && <p>Your cart is empty 😢</p>}

        {items.map((item) => (
          <div className="cart-card" key={item.id}>

            <img src={item.image} alt={item.title} />

            <div className="cart-details">

              <h3>{item.title}</h3>

              <p>
                ₹{(item.price * 83 * 0.8).toFixed(0)}
                <span className="cut-price">
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

      {/* ================= RIGHT SIDE ================= */}
      {items.length > 0 && (
        <div className="cart-right">

          <h3>Price Details</h3>

          <div className="summary-row">
            <span>MRP</span>
            <span>₹{mrp.toFixed(0)}</span>
          </div>

          <div className="summary-row">
            <span>Product Discount</span>
            <span className="green">
              -₹{productDiscount.toFixed(0)}
            </span>
          </div>

          <div className="summary-row">
            <span>Coupon Discount</span>
            <span className="green">
              -₹{discount.toFixed(0)}
            </span>
          </div>

          <div className="summary-row">
            <span>Total Savings</span>
            <span className="green">
              -₹{totalSaving.toFixed(0)}
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

          {/* ================= COUPON INPUT ================= */}
          <div className="coupon-input">
            <input
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            />

            <button onClick={applyCoupon} disabled={!coupon}>
              Apply
            </button>
          </div>

          {/* ================= COUPON LIST ================= */}
          <div className="coupon-list">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="coupon-box"
                onClick={() => setCoupon(c.code)}
              >
                <b>{c.code}</b>{" "}
                {c.type === "percent"
                  ? `${c.value}% OFF`
                  : `₹${c.value} OFF`}
                <br />
                <small>Min ₹{c.min}</small>
              </div>
            ))}
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <button className="checkout" onClick={handlePayment}>
            Place Order
          </button>

          <button
            className="clear"
            onClick={() => {
              dispatch(clearCart());
              setDiscount(0);
              setCoupon("");
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