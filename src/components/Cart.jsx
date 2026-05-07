import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../features/CartSlice";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ================= FIREBASE =================
import { db } from "../config/firebase";

import {
  collection,
  addDoc,
} from "firebase/firestore";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const INR_RATE = 83;

  // ================= COUPONS =================
  const coupons = [
    { code: "FLAT10", type: "percent", value: 10, min: 500, max: 200 },
    { code: "SAVE100", type: "flat", value: 100, min: 800 },
    { code: "SALE20", type: "percent", value: 20, min: 1000, max: 300 },
  ];

  // ================= PRICE CALC =================
  const mrp = items.reduce(
    (sum, item) => sum + item.price * item.quantity * INR_RATE,
    0,
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

      if (found.max) {
        discountValue = Math.min(discountValue, found.max);
      }
    } else {
      discountValue = found.value;
    }

    setDiscount(discountValue);

    localStorage.setItem(
      "usedCoupons",
      JSON.stringify([...used, found.code]),
    );

    toast.success("Coupon Applied 🎉");
  };

  // ================= SAVE ORDER =================
  const saveOrderToFirebase = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        items: items,
        total: total,
        subtotal: subtotal,
        delivery: delivery,
        discount: discount,
        totalSaving: totalSaving,
        createdAt: new Date(),
      });

      toast.success("Order Saved ✅");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save order ❌");
    }
  };

  // ================= CHECKOUT =================
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Cart is empty ❌");
      return;
    }

    await saveOrderToFirebase();

    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      {/* ================= LEFT SIDE ================= */}
      <div className="cart-left">
        <h2 className="cart-title">🛒 My Cart</h2>

        {items.length === 0 && (
          <div className="empty-cart">
            <div className="empty-box">
              <div className="emoji">🛒</div>

              <h2>Your cart is empty</h2>

              <p>Looks like you haven’t added anything yet</p>

              <button onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {items.map((item) => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="cart-details">
              <h3>{item.title}</h3>

              <p>
                ₹{(item.price * INR_RATE * 0.8).toFixed(0)}

                <span className="cut-price">
                  ₹{(item.price * INR_RATE).toFixed(0)}
                </span>
              </p>

              <div className="qty">
                <button onClick={() => dispatch(decreaseQty(item.id))}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => dispatch(increaseQty(item.id))}>
                  +
                </button>
              </div>
            </div>

            <button
              className="remove"
              onClick={() => {
                dispatch(removeFromCart(item.id));
                toast.success("Removed from cart");
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
            <span>Delivery</span>

            <span>
              {delivery === 0 ? "Free" : `₹${delivery}`}
            </span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <span>₹{total.toFixed(0)}</span>
          </div>

          {/* ================= COUPON ================= */}
          <div className="coupon-input">
            <input
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) =>
                setCoupon(e.target.value.toUpperCase())
              }
            />

            <button
              onClick={applyCoupon}
              disabled={!coupon}
            >
              Apply
            </button>
          </div>

          {/* ================= COUPON BOX ================= */}
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

          {/* ================= ACTIONS ================= */}
          <button
            className="checkout"
            onClick={handleCheckout}
          >
            Proceed to Checkout 🚀
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