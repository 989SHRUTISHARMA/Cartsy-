import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "../App.css";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const INR_RATE = 83;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * INR_RATE,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill all details");
      return;
    }

    toast.success("Order Placed Successfully 🎉");

    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/")}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>🧾 Checkout</h2>

      <div className="checkout-container">

        {/* LEFT - FORM */}
        <div className="checkout-form">
          <h3>Delivery Details</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cartItems.map((item) => (
            <div className="summary-item" key={item.id}>
              <img src={item.image} alt="" />
              <p>{item.title.slice(0, 25)}</p>
              <span>₹{(item.price * INR_RATE).toFixed(0)}</span>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total.toFixed(0)}</h2>

          <button className="place-order-btn" onClick={handleOrder}>
            Place Order 🚀
          </button>
        </div>

      </div>
    </div>
  );
}