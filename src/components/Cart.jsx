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

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity * 83,
    0
  );

  const delivery = subtotal > 500 ? 0 : 40;
  const finalDiscount = discount;
  const total = subtotal + delivery - finalDiscount;

  // 🎟️ Coupon system
  const applyCoupon = () => {
    if (coupon === "FLAT10") {
      setDiscount(subtotal * 0.1);
      toast.success("FLAT10 applied 🎉");
    } else if (coupon === "SAVE100") {
      setDiscount(100);
      toast.success("SAVE100 applied 🎉");
    } else {
      setDiscount(0);
      toast.error("Invalid Coupon ❌");
    }
  };

  // 💳 Razorpay Payment
  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: total * 100,
      currency: "INR",
      name: "Cartsy Store",
      description: "Order Payment",

      handler: function () {
        dispatch(clearCart());
        toast.success("🎉 Order Placed Successfully!");
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="cart-container">

      {/* LEFT SIDE */}
      <div className="cart-left">
        <h2>My Cart 🛒</h2>

        {items.length === 0 && <p>Your cart is empty 😢</p>}

        {items.map((item) => (
          <div className="cart-card" key={item.id}>

            <img src={item.image} alt={item.title} />

            <div className="cart-details">
              <h3>{item.title}</h3>
              <p>₹{(item.price * 83).toFixed(0)}</p>

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

      {/* RIGHT SIDE */}
      {items.length > 0 && (
        <div className="cart-right">

          <h3>Price Details</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹{delivery}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>-₹{finalDiscount.toFixed(0)}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          {/* Coupon */}
          <div style={{ marginTop: "10px" }}>
            <input
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>

          {/* Payment */}
          <button className="checkout" onClick={handlePayment}>
            Place Order
          </button>

          <button className="clear" onClick={() => {
            dispatch(clearCart());
            toast.success("Cart Cleared");
          }}>
            Clear Cart
          </button>

        </div>
      )}
    </div>
  );
}